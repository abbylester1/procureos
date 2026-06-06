with events as (
    select
        rfq_id,
        'rfq_uploaded' as event_type,
        project_name as actor,
        budget as event_value,
        current_timestamp as event_at
    from {{ ref('stg_rfqs') }}

    union all

    select
        rfq_id,
        'supplier_quote_received' as event_type,
        supplier_name as actor,
        extended_price as event_value,
        current_timestamp as event_at
    from {{ ref('stg_quotes') }}

    union all

    select
        rfq_id,
        'supplier_scored' as event_type,
        supplier_name as actor,
        total_score as event_value,
        current_timestamp as event_at
    from {{ ref('fct_vendor_scores') }}
)

select
    row_number() over (order by rfq_id, event_type, actor) as event_id,
    rfq_id,
    event_type,
    actor,
    event_value,
    event_at
from events
