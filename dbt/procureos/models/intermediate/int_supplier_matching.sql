with rfq_required as (
    select distinct
        rfq_id,
        coalesce(mapping.normalized_material, 'MISC_MATERIAL') as normalized_material
    from {{ ref('stg_materials') }} as materials
    left join {{ ref('int_material_mapping') }} as mapping
        on materials.material_name = mapping.material_name
    where rfq_id is not null
),

supplier_offerings as (
    select distinct
        rfq_id,
        supplier_id,
        supplier_name,
        normalized_material
    from {{ ref('int_price_normalization') }}
),

coverage as (
    select
        supplier_offerings.rfq_id,
        supplier_offerings.supplier_id,
        supplier_offerings.supplier_name,
        count(distinct supplier_offerings.normalized_material) as matched_items,
        count(distinct rfq_required.normalized_material) as required_items
    from supplier_offerings
    join rfq_required
        on supplier_offerings.rfq_id = rfq_required.rfq_id
    group by
        supplier_offerings.rfq_id,
        supplier_offerings.supplier_id,
        supplier_offerings.supplier_name
),

missing_items as (
    select
        required.rfq_id,
        suppliers.supplier_id,
        string_agg(required.normalized_material, ', ' order by required.normalized_material) as missing_items
    from rfq_required as required
    cross join (
        select distinct rfq_id, supplier_id from supplier_offerings
    ) as suppliers
    left join supplier_offerings as offering
        on required.rfq_id = offering.rfq_id
        and suppliers.supplier_id = offering.supplier_id
        and required.normalized_material = offering.normalized_material
    where suppliers.rfq_id = required.rfq_id
      and offering.normalized_material is null
    group by required.rfq_id, suppliers.supplier_id
)

select
    coverage.rfq_id,
    coverage.supplier_id,
    coverage.supplier_name,
    coverage.matched_items,
    coverage.required_items,
    round(coverage.matched_items * 100.0 / nullif(coverage.required_items, 0), 2) as coverage_pct,
    coalesce(missing_items.missing_items, '') as missing_items
from coverage
left join missing_items
    on coverage.rfq_id = missing_items.rfq_id
    and coverage.supplier_id = missing_items.supplier_id
