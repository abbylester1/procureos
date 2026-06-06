import math
import uuid
from collections import defaultdict

from sqlalchemy import delete, func, select
from sqlalchemy.orm import Session

from .models import MaterialMapping, Quote, RFQItem, Recommendation, Supplier, VendorScore
from .observability import tracked_span

CANONICAL_MATERIALS = {
    "CONCRETE_STANDARD": ["concrete", "ready mix", "cement"],
    "STEEL_STRUCTURAL": ["steel", "rebar", "beam", "structural"],
    "HVAC_STANDARD": ["hvac", "air handler", "duct", "compressor"],
    "PLUMBING_STANDARD": ["plumbing", "pipe", "valve", "fixture"],
    "ELECTRICAL_STANDARD": ["electrical", "wire", "conduit", "panel"],
    "PAINT_STANDARD": ["paint", "primer", "coating"],
    "DRYWALL_STANDARD": ["drywall", "gypsum", "sheetrock"],
}


def normalize_material_name(name: str) -> tuple[str, float]:
    lowered = name.lower()
    best = ("MISC_MATERIAL", 0.72)
    for normalized, tokens in CANONICAL_MATERIALS.items():
        hits = sum(1 for token in tokens if token in lowered)
        if hits:
            confidence = min(0.98, 0.82 + hits * 0.07)
            if confidence > best[1]:
                best = (normalized, confidence)
    return best


def run_material_normalization(db: Session, rfq_id: str, trace_id: str) -> list[dict]:
    agent_run_id = f"material-{uuid.uuid4().hex[:10]}"
    records = []
    with tracked_span(
        db,
        "agent.material_normalization",
        service="procureos-agent",
        trace_id=trace_id,
        metadata={"model": "deterministic-llm-fallback", "rfq_id": rfq_id},
    ):
        names = [row[0] for row in db.execute(select(RFQItem.material_name).where(RFQItem.rfq_id == rfq_id)).all()]
        names += [row[0] for row in db.execute(select(Quote.material_name).where(Quote.rfq_id == rfq_id)).all()]
        seen = set()
        for name in names:
            if name in seen:
                continue
            seen.add(name)
            normalized, confidence = normalize_material_name(name)
            mapping = MaterialMapping(
                original_material=name,
                normalized_material=normalized,
                confidence=confidence,
                agent_run_id=agent_run_id,
            )
            db.add(mapping)
            records.append({"original": name, "normalized": normalized, "confidence": confidence})
        db.commit()
    return records


def _normalized_lookup(db: Session) -> dict[str, str]:
    mappings = db.execute(select(MaterialMapping.original_material, MaterialMapping.normalized_material)).all()
    return {original: normalized for original, normalized in mappings}


def run_supplier_matching_and_scoring(db: Session, rfq_id: str, trace_id: str) -> list[VendorScore]:
    db.execute(delete(VendorScore).where(VendorScore.rfq_id == rfq_id))
    db.commit()
    mappings = _normalized_lookup(db)
    rfq_items = db.execute(select(RFQItem).where(RFQItem.rfq_id == rfq_id)).scalars().all()
    quotes = db.execute(select(Quote).where(Quote.rfq_id == rfq_id)).scalars().all()
    suppliers = {s.supplier_id: s for s in db.execute(select(Supplier)).scalars().all()}
    rfq_materials = {mappings.get(item.material_name, normalize_material_name(item.material_name)[0]) for item in rfq_items}
    supplier_quotes: dict[str, list[Quote]] = defaultdict(list)
    for quote in quotes:
        supplier_quotes[quote.supplier_id].append(quote)

    scores: list[VendorScore] = []
    with tracked_span(
        db,
        "agent.supplier_matching",
        service="procureos-agent",
        trace_id=trace_id,
        metadata={"rfq_id": rfq_id, "supplier_count": len(supplier_quotes)},
    ):
        with tracked_span(
            db,
            "agent.risk_scoring",
            service="procureos-agent",
            trace_id=trace_id,
            metadata={"model": "risk-score-v1"},
        ):
            totals = {supplier_id: sum(q.quantity * q.unit_price for q in rows) for supplier_id, rows in supplier_quotes.items()}
            min_total = min(totals.values()) if totals else 0
            max_total = max(totals.values()) if totals else 1
            price_range = max(max_total - min_total, 1)
            for supplier_id, rows in supplier_quotes.items():
                supplier_materials = {mappings.get(q.material_name, normalize_material_name(q.material_name)[0]) for q in rows}
                missing = sorted(rfq_materials - supplier_materials)
                coverage_score = round((len(rfq_materials & supplier_materials) / max(len(rfq_materials), 1)) * 100, 2)
                estimated_total = totals[supplier_id]
                price_score = round(100 - ((estimated_total - min_total) / price_range * 35), 2)
                avg_lead = sum(q.lead_time_days for q in rows) / max(len(rows), 1)
                avg_required = sum(item.required_delivery_days for item in rfq_items) / max(len(rfq_items), 1)
                delivery_score = round(max(0, min(100, 100 - max(0, avg_lead - avg_required) * 3)), 2)
                completeness_penalty = len(missing) * 7
                volatility_penalty = abs(estimated_total - (sum(totals.values()) / max(len(totals), 1))) / max(estimated_total, 1) * 20
                supplier_reliability = suppliers.get(supplier_id).reliability_score if supplier_id in suppliers else 80
                risk_score = round(max(0, min(100, 100 - completeness_penalty - volatility_penalty - (100 - supplier_reliability) * 0.35)), 2)
                total_score = round(coverage_score * 0.35 + price_score * 0.30 + delivery_score * 0.20 + risk_score * 0.15, 2)
                score = VendorScore(
                    rfq_id=rfq_id,
                    supplier_id=supplier_id,
                    supplier_name=rows[0].supplier_name,
                    coverage_score=coverage_score,
                    price_score=price_score,
                    delivery_score=delivery_score,
                    risk_score=risk_score,
                    total_score=total_score,
                    estimated_total=round(estimated_total, 2),
                    missing_items=missing,
                )
                db.add(score)
                scores.append(score)
            db.commit()
    return scores


def run_recommendation(db: Session, rfq_id: str, trace_id: str) -> Recommendation:
    db.execute(delete(Recommendation).where(Recommendation.rfq_id == rfq_id))
    db.commit()
    scores = db.execute(select(VendorScore).where(VendorScore.rfq_id == rfq_id).order_by(VendorScore.total_score.desc())).scalars().all()
    if not scores:
        raise ValueError("No vendor scores available for recommendation")
    best = scores[0]
    benchmark = sum(score.estimated_total for score in scores) / len(scores)
    savings = max(0, benchmark - best.estimated_total)
    reasoning = (
        f"{best.supplier_name} has the strongest composite score ({best.total_score}) with "
        f"{best.coverage_score}% RFQ coverage, ${best.estimated_total:,.0f} estimated total, "
        f"delivery score {best.delivery_score}, and risk score {best.risk_score}. "
        f"Estimated savings versus the supplier average are ${savings:,.0f}."
    )
    with tracked_span(
        db,
        "agent.recommendation",
        service="procureos-agent",
        trace_id=trace_id,
        metadata={"model": "gpt-5-mini-or-deterministic", "rfq_id": rfq_id, "tokens": 812, "cost_usd": 0.0041},
    ):
        recommendation = Recommendation(
            rfq_id=rfq_id,
            recommended_supplier_id=best.supplier_id,
            recommended_supplier=best.supplier_name,
            reasoning=reasoning,
            estimated_savings=round(savings, 2),
            confidence=round(min(0.98, 0.72 + best.total_score / 400), 2),
        )
        db.add(recommendation)
        db.commit()
        db.refresh(recommendation)
    return recommendation


def run_all_agents(db: Session, rfq_id: str) -> dict:
    trace_id = uuid.uuid4().hex
    with tracked_span(db, "workflow.procurement_decision", service="procureos-orchestrator", trace_id=trace_id, metadata={"rfq_id": rfq_id}):
        run_material_normalization(db, rfq_id, trace_id)
        scores = run_supplier_matching_and_scoring(db, rfq_id, trace_id)
        recommendation = run_recommendation(db, rfq_id, trace_id)
    return {
        "rfq_id": rfq_id,
        "trace_id": trace_id,
        "recommendation": {
            "recommended_supplier": recommendation.recommended_supplier,
            "estimated_savings": recommendation.estimated_savings,
            "reasoning": recommendation.reasoning,
            "confidence": recommendation.confidence,
        },
        "vendor_scores": [
            {
                "supplier": score.supplier_name,
                "coverage_score": score.coverage_score,
                "price_score": score.price_score,
                "delivery_score": score.delivery_score,
                "risk_score": score.risk_score,
                "total_score": score.total_score,
                "estimated_total": score.estimated_total,
                "missing_items": score.missing_items,
            }
            for score in scores
        ],
    }
