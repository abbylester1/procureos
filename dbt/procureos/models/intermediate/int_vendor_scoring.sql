with quote_totals as (
    select
        rfq_id,
        supplier_id,
        supplier_name,
        sum(extended_price_usd) as estimated_total,
        avg(lead_time_days) as avg_lead_time_days,
        count(*) as quote_line_count
    from {{ ref('int_price_normalization') }}
    group by rfq_id, supplier_id, supplier_name
),

benchmarks as (
    select
        rfq_id,
        min(estimated_total) as min_total,
        max(estimated_total) as max_total,
        avg(estimated_total) as avg_total
    from quote_totals
    group by rfq_id
),

required_delivery as (
    select
        rfq_id,
        avg(required_delivery_days) as avg_required_delivery_days
    from {{ ref('stg_materials') }}
    where rfq_id is not null
    group by rfq_id
)

select
    quote_totals.rfq_id,
    quote_totals.supplier_id,
    quote_totals.supplier_name,
    matching.coverage_pct as coverage_score,
    round(100 - ((quote_totals.estimated_total - benchmarks.min_total) / nullif(benchmarks.max_total - benchmarks.min_total, 0) * 35), 2) as price_score,
    round(greatest(0, least(100, 100 - greatest(0, quote_totals.avg_lead_time_days - required_delivery.avg_required_delivery_days) * 3)), 2) as delivery_score,
    round(greatest(0, least(100, 100 - ((100 - matching.coverage_pct) * 0.45) - abs(quote_totals.estimated_total - benchmarks.avg_total) / nullif(quote_totals.estimated_total, 0) * 20)), 2) as risk_score,
    quote_totals.estimated_total,
    quote_totals.avg_lead_time_days,
    quote_totals.quote_line_count,
    matching.missing_items
from quote_totals
join benchmarks
    on quote_totals.rfq_id = benchmarks.rfq_id
join required_delivery
    on quote_totals.rfq_id = required_delivery.rfq_id
join {{ ref('int_supplier_matching') }} as matching
    on quote_totals.rfq_id = matching.rfq_id
    and quote_totals.supplier_id = matching.supplier_id
