from sqlalchemy import func, select
from sqlalchemy.orm import Session

from .models import DataQualityResult, Quote, RFQ, RFQItem, Supplier

VALID_CURRENCIES = {"USD", "EUR", "GBP", "CAD", "MXN"}


def evaluate_quality(db: Session) -> dict:
    checks = []

    null_rfqs = db.execute(select(func.count()).select_from(RFQ).where(RFQ.rfq_id.is_(None))).scalar_one()
    checks.append(("no_null_rfq_ids", "stg_rfqs", null_rfqs))

    null_supplier_names = db.execute(select(func.count()).select_from(Supplier).where(Supplier.supplier_name.is_(None))).scalar_one()
    checks.append(("no_null_supplier_names", "stg_suppliers", null_supplier_names))

    bad_prices = db.execute(select(func.count()).select_from(Quote).where(Quote.unit_price <= 0)).scalar_one()
    checks.append(("positive_prices_only", "stg_quotes", bad_prices))

    duplicate_quote_ids = db.execute(
        select(func.count()).select_from(
            select(Quote.quote_id).group_by(Quote.quote_id).having(func.count() > 1).subquery()
        )
    ).scalar_one()
    checks.append(("no_duplicate_quote_ids", "stg_quotes", duplicate_quote_ids))

    invalid_currency = db.execute(select(func.count()).select_from(Quote).where(~Quote.currency.in_(VALID_CURRENCIES))).scalar_one()
    checks.append(("valid_currency_values", "stg_quotes", invalid_currency))

    duplicate_materials = db.execute(
        select(func.count()).select_from(
            select(RFQItem.rfq_id, RFQItem.material_name).group_by(RFQItem.rfq_id, RFQItem.material_name).having(func.count() > 1).subquery()
        )
    ).scalar_one()
    checks.append(("duplicate_material_detection", "stg_materials", duplicate_materials))

    results = []
    db.query(DataQualityResult).delete()
    for test_name, model_name, failures in checks:
        result = DataQualityResult(
            test_name=test_name,
            model_name=model_name,
            status="pass" if failures == 0 else "fail",
            failures=int(failures),
            severity="error" if failures else "info",
            details={"description": test_name.replace("_", " ")},
        )
        db.add(result)
        results.append(result)
    db.commit()
    passed = sum(1 for _, _, failures in checks if failures == 0)
    score = round((passed / len(checks)) * 100, 2)
    return {
        "quality_score": score,
        "passed": passed,
        "failed": len(checks) - passed,
        "results": [
            {
                "test_name": result.test_name,
                "model_name": result.model_name,
                "status": result.status,
                "failures": result.failures,
                "severity": result.severity,
            }
            for result in results
        ],
    }
