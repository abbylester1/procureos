with source as (
    select
        quote_id,
        rfq_id,
        supplier_id,
        supplier_name,
        material_name,
        category,
        cast(quantity as numeric) as quantity,
        unit,
        cast(unit_price as numeric) as unit_price,
        upper(currency) as currency,
        cast(lead_time_days as integer) as lead_time_days
    from {{ ref('raw_quotes') }}
)

select
    quote_id,
    rfq_id,
    supplier_id,
    supplier_name,
    material_name,
    category,
    quantity,
    unit,
    unit_price,
    currency,
    lead_time_days,
    quantity * unit_price as extended_price
from source
