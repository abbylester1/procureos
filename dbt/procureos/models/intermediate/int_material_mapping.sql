with materials as (
    select distinct
        material_name,
        category
    from {{ ref('stg_materials') }}
),

classified as (
    select
        material_name,
        category,
        case
            when lower(material_name) like '%concrete%' or lower(material_name) like '%cement%' then 'CONCRETE_STANDARD'
            when lower(material_name) like '%steel%' or lower(material_name) like '%rebar%' or lower(material_name) like '%beam%' then 'STEEL_STRUCTURAL'
            when lower(material_name) like '%hvac%' or lower(material_name) like '%duct%' or lower(material_name) like '%air%' or lower(material_name) like '%vav%' then 'HVAC_STANDARD'
            when lower(material_name) like '%pipe%' or lower(material_name) like '%valve%' or lower(material_name) like '%plumbing%' or lower(material_name) like '%fixture%' then 'PLUMBING_STANDARD'
            when lower(material_name) like '%wire%' or lower(material_name) like '%conduit%' or lower(material_name) like '%panel%' or lower(material_name) like '%junction%' or lower(material_name) like '%led%' then 'ELECTRICAL_STANDARD'
            when lower(material_name) like '%paint%' or lower(material_name) like '%primer%' or lower(material_name) like '%coating%' then 'PAINT_STANDARD'
            when lower(material_name) like '%drywall%' or lower(material_name) like '%gypsum%' or lower(material_name) like '%sheetrock%' or lower(material_name) like '%compound%' then 'DRYWALL_STANDARD'
            else 'MISC_MATERIAL'
        end as normalized_material,
        case
            when category in ('Concrete', 'Steel', 'HVAC', 'Plumbing', 'Electrical', 'Paint', 'Drywall') then 0.95
            else 0.75
        end as confidence
    from materials
)

select
    material_name,
    category,
    normalized_material,
    confidence
from classified
