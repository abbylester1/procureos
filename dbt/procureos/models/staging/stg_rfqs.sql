with source as (
    select
        rfq_id,
        project_name,
        cast(budget as numeric) as budget
    from {{ ref('raw_rfqs') }}
)

select
    rfq_id,
    project_name,
    budget,
    current_timestamp as loaded_at
from source
