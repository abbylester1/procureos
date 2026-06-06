with supplier_totals as (
    select
        rfq_id,
        supplier_id,
        supplier_name,
        estimated_total,
        total_score,
        avg(estimated_total) over (partition by rfq_id) as average_supplier_total,
        min(estimated_total) over (partition by rfq_id) as lowest_supplier_total
    from {{ ref('fct_vendor_scores') }}
),

ranked as (
    select
        rfq_id,
        supplier_id,
        supplier_name,
        estimated_total,
        total_score,
        average_supplier_total,
        lowest_supplier_total,
        average_supplier_total - estimated_total as savings_vs_average,
        row_number() over (partition by rfq_id order by total_score desc, estimated_total asc, supplier_id asc) as supplier_rank
    from supplier_totals
)

select
    rfq_id,
    supplier_id,
    supplier_name,
    estimated_total,
    total_score,
    average_supplier_total,
    lowest_supplier_total,
    savings_vs_average,
    supplier_rank
from ranked
