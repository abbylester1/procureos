from datetime import datetime
from sqlalchemy import JSON, DateTime, Float, ForeignKey, Integer, String, Text, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship
from .database import Base


class RFQ(Base):
    __tablename__ = "rfqs"

    rfq_id: Mapped[str] = mapped_column(String(64), primary_key=True)
    project_name: Mapped[str] = mapped_column(String(255), nullable=False)
    budget: Mapped[float] = mapped_column(Float, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    raw_payload: Mapped[dict] = mapped_column(JSON, default=dict)
    items: Mapped[list["RFQItem"]] = relationship(back_populates="rfq", cascade="all, delete-orphan")


class RFQItem(Base):
    __tablename__ = "rfq_items"

    item_id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    rfq_id: Mapped[str] = mapped_column(ForeignKey("rfqs.rfq_id"), nullable=False)
    line_number: Mapped[int] = mapped_column(Integer, nullable=False)
    material_name: Mapped[str] = mapped_column(String(255), nullable=False)
    category: Mapped[str] = mapped_column(String(100), nullable=False)
    quantity: Mapped[float] = mapped_column(Float, nullable=False)
    unit: Mapped[str] = mapped_column(String(50), nullable=False)
    required_delivery_days: Mapped[int] = mapped_column(Integer, nullable=False)
    rfq: Mapped[RFQ] = relationship(back_populates="items")


class Supplier(Base):
    __tablename__ = "suppliers"

    supplier_id: Mapped[str] = mapped_column(String(64), primary_key=True)
    supplier_name: Mapped[str] = mapped_column(String(255), nullable=False, unique=True)
    region: Mapped[str] = mapped_column(String(100), nullable=False)
    reliability_score: Mapped[float] = mapped_column(Float, nullable=False, default=85)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)


class Quote(Base):
    __tablename__ = "quotes"
    __table_args__ = (UniqueConstraint("quote_id"),)

    quote_id: Mapped[str] = mapped_column(String(80), primary_key=True)
    rfq_id: Mapped[str] = mapped_column(ForeignKey("rfqs.rfq_id"), nullable=False)
    supplier_id: Mapped[str] = mapped_column(ForeignKey("suppliers.supplier_id"), nullable=False)
    supplier_name: Mapped[str] = mapped_column(String(255), nullable=False)
    material_name: Mapped[str] = mapped_column(String(255), nullable=False)
    category: Mapped[str] = mapped_column(String(100), nullable=False)
    quantity: Mapped[float] = mapped_column(Float, nullable=False)
    unit: Mapped[str] = mapped_column(String(50), nullable=False)
    unit_price: Mapped[float] = mapped_column(Float, nullable=False)
    currency: Mapped[str] = mapped_column(String(3), nullable=False, default="USD")
    lead_time_days: Mapped[int] = mapped_column(Integer, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)


class MaterialMapping(Base):
    __tablename__ = "material_mappings"

    mapping_id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    original_material: Mapped[str] = mapped_column(String(255), nullable=False)
    normalized_material: Mapped[str] = mapped_column(String(100), nullable=False)
    confidence: Mapped[float] = mapped_column(Float, nullable=False)
    agent_run_id: Mapped[str] = mapped_column(String(80), nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)


class VendorScore(Base):
    __tablename__ = "vendor_scores"

    score_id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    rfq_id: Mapped[str] = mapped_column(String(64), nullable=False)
    supplier_id: Mapped[str] = mapped_column(String(64), nullable=False)
    supplier_name: Mapped[str] = mapped_column(String(255), nullable=False)
    coverage_score: Mapped[float] = mapped_column(Float, nullable=False)
    price_score: Mapped[float] = mapped_column(Float, nullable=False)
    delivery_score: Mapped[float] = mapped_column(Float, nullable=False)
    risk_score: Mapped[float] = mapped_column(Float, nullable=False)
    total_score: Mapped[float] = mapped_column(Float, nullable=False)
    estimated_total: Mapped[float] = mapped_column(Float, nullable=False)
    missing_items: Mapped[list] = mapped_column(JSON, default=list)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)


class Recommendation(Base):
    __tablename__ = "recommendations"

    recommendation_id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    rfq_id: Mapped[str] = mapped_column(String(64), nullable=False)
    recommended_supplier_id: Mapped[str] = mapped_column(String(64), nullable=False)
    recommended_supplier: Mapped[str] = mapped_column(String(255), nullable=False)
    reasoning: Mapped[str] = mapped_column(Text, nullable=False)
    estimated_savings: Mapped[float] = mapped_column(Float, nullable=False)
    confidence: Mapped[float] = mapped_column(Float, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)


class TraceEvent(Base):
    __tablename__ = "trace_events"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    trace_id: Mapped[str] = mapped_column(String(80), nullable=False, index=True)
    span_id: Mapped[str] = mapped_column(String(80), nullable=False)
    parent_span_id: Mapped[str | None] = mapped_column(String(80), nullable=True)
    service: Mapped[str] = mapped_column(String(100), nullable=False)
    operation: Mapped[str] = mapped_column(String(255), nullable=False)
    status: Mapped[str] = mapped_column(String(30), nullable=False, default="OK")
    duration_ms: Mapped[float] = mapped_column(Float, nullable=False, default=0)
    metadata: Mapped[dict] = mapped_column(JSON, default=dict)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)


class DataQualityResult(Base):
    __tablename__ = "data_quality_results"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    test_name: Mapped[str] = mapped_column(String(255), nullable=False)
    model_name: Mapped[str] = mapped_column(String(255), nullable=False)
    status: Mapped[str] = mapped_column(String(30), nullable=False)
    failures: Mapped[int] = mapped_column(Integer, default=0)
    severity: Mapped[str] = mapped_column(String(30), default="error")
    details: Mapped[dict] = mapped_column(JSON, default=dict)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
