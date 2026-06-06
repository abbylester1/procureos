with scored as (
    select
        rfq_id,
        supplier_id,
        supplier_name,
        coverage_score,
        price_score,
        delivery_score,
        risk_score,
        round(coverage_score * 0.35 + price_score * 0.30 + delivery_score * 0.20 + risk_score * 0.15, 2) as total_score,
        estimated_total,
        avg_lead_time_days,
        quote_line_count,
        missing_items
    from {{ ref('int_vendor_scoring') }}
)

select
    rfq_id,
    supplier_id,
    supplier_name,
    coverage_score,
    price_score,
    delivery_score,
    risk_score,
    total_score,
    estimated_total,
    avg_lead_time_days,
    quote_line_count,
    missing_items
from scored
