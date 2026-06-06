with source as (
    select
        supplier_id,
        supplier_name,
        region,
        cast(reliability_score as numeric) as reliability_score
    from {{ ref('raw_suppliers') }}
)

select
    supplier_id,
    supplier_name,
    region,
    reliability_score
from source
