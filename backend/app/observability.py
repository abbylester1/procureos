import time
import uuid
from contextlib import contextmanager
from typing import Any, Iterator

from opentelemetry import trace
from sqlalchemy.orm import Session

from .models import TraceEvent

tracer = trace.get_tracer("procureos")


def _new_span_id() -> str:
    return uuid.uuid4().hex[:16]


@contextmanager
def tracked_span(
    db: Session,
    operation: str,
    service: str = "procureos-api",
    trace_id: str | None = None,
    parent_span_id: str | None = None,
    metadata: dict[str, Any] | None = None,
) -> Iterator[dict[str, str]]:
    trace_id = trace_id or uuid.uuid4().hex
    span_id = _new_span_id()
    started = time.perf_counter()
    status = "OK"
    event_metadata = metadata or {}

    with tracer.start_as_current_span(operation) as otel_span:
        otel_span.set_attribute("procureos.trace_id", trace_id)
        otel_span.set_attribute("procureos.span_id", span_id)
        for key, value in event_metadata.items():
            otel_span.set_attribute(f"procureos.{key}", str(value))
        try:
            yield {"trace_id": trace_id, "span_id": span_id}
        except Exception as exc:  # pragma: no cover - records then rethrows
            status = "ERROR"
            event_metadata = {**event_metadata, "error": str(exc)}
            otel_span.record_exception(exc)
            raise
        finally:
            duration_ms = round((time.perf_counter() - started) * 1000, 2)
            db.add(
                TraceEvent(
                    trace_id=trace_id,
                    span_id=span_id,
                    parent_span_id=parent_span_id,
                    service=service,
                    operation=operation,
                    status=status,
                    duration_ms=duration_ms,
                    metadata=event_metadata,
                )
            )
            db.commit()
