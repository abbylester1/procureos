with recommendations as (
    select
        rfq_id,
        supplier_id as recommended_supplier_id,
        supplier_name as recommended_supplier,
        estimated_total,
        total_score,
        savings_vs_average as estimated_savings,
        case
            when total_score >= 90 then 0.94
            when total_score >= 85 then 0.89
            else 0.82
        end as confidence,
        'Selected ' || supplier_name || ' because it maximizes risk-adjusted procurement value with strong coverage, delivery confidence, and savings versus the supplier benchmark.' as reasoning
    from {{ ref('fct_procurement_savings') }}
    where supplier_rank = 1
)

select
    rfq_id,
    recommended_supplier_id,
    recommended_supplier,
    estimated_total,
    total_score,
    estimated_savings,
    confidence,
    reasoning
from recommendations
