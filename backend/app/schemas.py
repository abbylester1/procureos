from pydantic import BaseModel, Field


class RFQItemIn(BaseModel):
    line_number: int
    material_name: str
    category: str
    quantity: float
    unit: str
    required_delivery_days: int


class RFQIn(BaseModel):
    rfq_id: str
    project_name: str
    budget: float
    items: list[RFQItemIn] = Field(default_factory=list)


class SupplierQuoteIn(BaseModel):
    quote_id: str
    rfq_id: str
    supplier_id: str
    supplier_name: str
    material_name: str
    category: str
    quantity: float
    unit: str
    unit_price: float
    currency: str = "USD"
    lead_time_days: int


class AgentRunResult(BaseModel):
    rfq_id: str
    trace_id: str
    recommendation: dict
    vendor_scores: list[dict]


class LineageNode(BaseModel):
    id: str
    label: str
    type: str
    record_count: int
    metadata: dict


class LineageEdge(BaseModel):
    source: str
    target: str
    label: str


class LineageGraph(BaseModel):
    nodes: list[LineageNode]
    edges: list[LineageEdge]
