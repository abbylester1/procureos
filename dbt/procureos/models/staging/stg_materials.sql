with rfq_materials as (
    select
        rfq_id,
        line_number,
        material_name,
        category,
        cast(quantity as numeric) as quantity,
        unit,
        cast(required_delivery_days as integer) as required_delivery_days
    from {{ ref('raw_rfq_items') }}
),

catalog as (
    select distinct
        material_name,
        category,
        unit
    from {{ ref('raw_materials') }}
)

select
    row_number() over (order by rfq_id, line_number) as material_line_id,
    rfq_id,
    line_number,
    material_name,
    category,
    quantity,
    unit,
    required_delivery_days
from rfq_materials

union all

select
    100000 + row_number() over (order by material_name, category) as material_line_id,
    null as rfq_id,
    null as line_number,
    material_name,
    category,
    null as quantity,
    unit,
    null as required_delivery_days
from catalog
where not exists (
    select 1
    from rfq_materials
    where rfq_materials.material_name = catalog.material_name
)
