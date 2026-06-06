from fastapi import APIRouter, Depends, File, HTTPException, UploadFile
from sqlalchemy import func, select
from sqlalchemy.orm import Session

from .agents import run_all_agents
from .database import get_db
from .ingestion import normalize_currency, parse_upload
from .models import Quote, RFQ, RFQItem, Recommendation, Supplier, TraceEvent, VendorScore
from .observability import tracked_span
from .quality import evaluate_quality
from .schemas import RFQIn

router = APIRouter()


@router.get("/health")
def health() -> dict:
    return {"status": "ok", "service": "procureos-api"}


@router.post("/rfq/upload")
def upload_rfq(payload: RFQIn, db: Session = Depends(get_db)) -> dict:
    with tracked_span(db, "POST /rfq/upload", metadata={"rfq_id": payload.rfq_id, "item_count": len(payload.items)}):
        db.merge(RFQ(rfq_id=payload.rfq_id, project_name=payload.project_name, budget=payload.budget, raw_payload=payload.model_dump()))
        db.query(RFQItem).filter(RFQItem.rfq_id == payload.rfq_id).delete()
        for item in payload.items:
            db.add(RFQItem(rfq_id=payload.rfq_id, **item.model_dump()))
        db.commit()
    return {"rfq_id": payload.rfq_id, "items": len(payload.items), "status": "ingested"}


@router.post("/rfq/upload-file")
def upload_rfq_file(file: UploadFile = File(...), db: Session = Depends(get_db)) -> dict:
    parsed = parse_upload(file)
    if not isinstance(parsed, dict):
        raise HTTPException(status_code=400, detail="RFQ file must contain one JSON object")
    return upload_rfq(RFQIn.model_validate(parsed), db)


@router.post("/supplier/upload")
def upload_supplier_quotes(file: UploadFile = File(...), db: Session = Depends(get_db)) -> dict:
    rows = parse_upload(file)
    if not isinstance(rows, list):
        raise HTTPException(status_code=400, detail="Supplier quote file must contain rows")
    trace_meta = {"filename": file.filename, "row_count": len(rows)}
    with tracked_span(db, "POST /supplier/upload", metadata=trace_meta):
        for raw in rows:
            supplier_id = str(raw.get("supplier_id") or raw.get("supplier_name", "supplier")).lower().replace(" ", "-")
            supplier_name = str(raw["supplier_name"])
            db.merge(
                Supplier(
                    supplier_id=supplier_id,
                    supplier_name=supplier_name,
                    region=str(raw.get("region", "US")),
                    reliability_score=float(raw.get("reliability_score", 86)),
                )
            )
            db.merge(
                Quote(
                    quote_id=str(raw["quote_id"]),
                    rfq_id=str(raw["rfq_id"]),
                    supplier_id=supplier_id,
                    supplier_name=supplier_name,
                    material_name=str(raw["material_name"]),
                    category=str(raw.get("category", "General")),
                    quantity=float(raw["quantity"]),
                    unit=str(raw.get("unit", "ea")),
                    unit_price=float(raw["unit_price"]),
                    currency=normalize_currency(str(raw.get("currency", "USD"))),
                    lead_time_days=int(float(raw.get("lead_time_days", 14))),
                )
            )
        db.commit()
    return {"status": "ingested", "rows": len(rows), "filename": file.filename}


@router.post("/agents/run/{rfq_id}")
def run_agents(rfq_id: str, db: Session = Depends(get_db)) -> dict:
    if not db.get(RFQ, rfq_id):
        raise HTTPException(status_code=404, detail="RFQ not found")
    return run_all_agents(db, rfq_id)


@router.get("/recommendation/{rfq_id}")
def get_recommendation(rfq_id: str, db: Session = Depends(get_db)) -> dict:
    with tracked_span(db, "GET /recommendation", metadata={"rfq_id": rfq_id}):
        recommendation = db.execute(
            select(Recommendation).where(Recommendation.rfq_id == rfq_id).order_by(Recommendation.created_at.desc())
        ).scalars().first()
        scores = db.execute(select(VendorScore).where(VendorScore.rfq_id == rfq_id).order_by(VendorScore.total_score.desc())).scalars().all()
    if not recommendation:
        raise HTTPException(status_code=404, detail="Recommendation not found. Run agents first.")
    return {
        "recommendation": {
            "supplier": recommendation.recommended_supplier,
            "estimated_savings": recommendation.estimated_savings,
            "reasoning": recommendation.reasoning,
            "confidence": recommendation.confidence,
        },
        "vendor_scores": [
            {
                "supplier": score.supplier_name,
                "coverage": score.coverage_score,
                "risk": score.risk_score,
                "total_score": score.total_score,
                "estimated_total": score.estimated_total,
                "missing_items": score.missing_items,
            }
            for score in scores
        ],
    }


@router.get("/overview")
def overview(db: Session = Depends(get_db)) -> dict:
    rfq_count = db.execute(select(func.count()).select_from(RFQ)).scalar_one()
    supplier_count = db.execute(select(func.count()).select_from(Supplier)).scalar_one()
    avg_savings = db.execute(select(func.coalesce(func.avg(Recommendation.estimated_savings), 0))).scalar_one()
    quality = evaluate_quality(db)
    spend_by_vendor = db.execute(select(Quote.supplier_name, func.sum(Quote.quantity * Quote.unit_price)).group_by(Quote.supplier_name)).all()
    savings_by_rfq = db.execute(select(Recommendation.rfq_id, Recommendation.estimated_savings)).all()
    return {
        "cards": {
            "rfqs_processed": rfq_count,
            "suppliers_evaluated": supplier_count,
            "average_savings": round(float(avg_savings or 0), 2),
            "data_quality_score": quality["quality_score"],
        },
        "spend_by_vendor": [{"vendor": vendor, "spend": round(float(spend), 2)} for vendor, spend in spend_by_vendor],
        "savings_by_rfq": [{"rfq_id": rfq_id, "savings": round(float(savings), 2)} for rfq_id, savings in savings_by_rfq],
    }


@router.get("/quality")
def quality(db: Session = Depends(get_db)) -> dict:
    return evaluate_quality(db)


@router.get("/traces")
def traces(db: Session = Depends(get_db)) -> dict:
    events = db.execute(select(TraceEvent).order_by(TraceEvent.created_at.desc()).limit(200)).scalars().all()
    return {
        "traces": [
            {
                "id": event.id,
                "trace_id": event.trace_id,
                "span_id": event.span_id,
                "service": event.service,
                "operation": event.operation,
                "status": event.status,
                "duration_ms": event.duration_ms,
                "metadata": event.metadata,
                "created_at": event.created_at.isoformat(),
            }
            for event in events
        ]
    }


@router.get("/lineage")
def lineage(db: Session = Depends(get_db)) -> dict:
    counts = {
        "RFQ": db.execute(select(func.count()).select_from(RFQ)).scalar_one(),
        "Materials": db.execute(select(func.count()).select_from(RFQItem)).scalar_one(),
        "Supplier Quotes": db.execute(select(func.count()).select_from(Quote)).scalar_one(),
        "Vendor Scores": db.execute(select(func.count()).select_from(VendorScore)).scalar_one(),
        "Recommendations": db.execute(select(func.count()).select_from(Recommendation)).scalar_one(),
    }
    nodes = [
        {"id": "rfq", "label": "RFQ", "type": "source", "record_count": counts["RFQ"], "metadata": {"layer": "ingestion"}},
        {"id": "materials", "label": "Materials", "type": "source", "record_count": counts["Materials"], "metadata": {"layer": "staging"}},
        {"id": "normalized", "label": "Normalized Materials", "type": "agent", "record_count": counts["Materials"], "metadata": {"agent": "material_normalization"}},
        {"id": "quotes", "label": "Supplier Quotes", "type": "source", "record_count": counts["Supplier Quotes"], "metadata": {"layer": "staging"}},
        {"id": "scores", "label": "Vendor Scores", "type": "mart", "record_count": counts["Vendor Scores"], "metadata": {"model": "fct_vendor_scores"}},
        {"id": "recommendations", "label": "Recommendations", "type": "mart", "record_count": counts["Recommendations"], "metadata": {"model": "procurement_recommendations"}},
    ]
    edges = [
        {"source": "rfq", "target": "materials", "label": "contains"},
        {"source": "materials", "target": "normalized", "label": "LLM normalized"},
        {"source": "normalized", "target": "scores", "label": "coverage scoring"},
        {"source": "quotes", "target": "scores", "label": "price + delivery scoring"},
        {"source": "scores", "target": "recommendations", "label": "recommendation agent"},
    ]
    return {"nodes": nodes, "edges": edges}
