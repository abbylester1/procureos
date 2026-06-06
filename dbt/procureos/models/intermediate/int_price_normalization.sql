with quotes as (
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
        extended_price
    from {{ ref('stg_quotes') }}
),

mapped as (
    select
        quotes.quote_id,
        quotes.rfq_id,
        quotes.supplier_id,
        quotes.supplier_name,
        coalesce(mapping.normalized_material, 'MISC_MATERIAL') as normalized_material,
        quotes.material_name,
        quotes.category,
        quotes.quantity,
        quotes.unit,
        quotes.unit_price,
        quotes.currency,
        quotes.lead_time_days,
        quotes.extended_price,
        case
            when quotes.currency = 'USD' then quotes.unit_price
            else quotes.unit_price
        end as unit_price_usd,
        case
            when quotes.currency = 'USD' then quotes.extended_price
            else quotes.extended_price
        end as extended_price_usd
    from quotes
    left join {{ ref('int_material_mapping') }} as mapping
        on quotes.material_name = mapping.material_name
)

select
    quote_id,
    rfq_id,
    supplier_id,
    supplier_name,
    normalized_material,
    material_name,
    category,
    quantity,
    unit,
    unit_price,
    currency,
    lead_time_days,
    extended_price,
    unit_price_usd,
    extended_price_usd
from mapped
