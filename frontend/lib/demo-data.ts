export type Supplier = {
  id: string
  name: string
  cost: number
  coverage: number
  deliveryDays: number
  risk: 'Low' | 'Medium' | 'Critical'
  score: number
  missingItems: number
  quoteCompleteness: number
  anomaly: string
}

export type TraceEvent = {
  traceId: string
  span: string
  service: string
  operation: string
  durationMs: number
  status: 'OK' | 'WARN' | 'ERROR'
  timestamp: string
}

export const rfq = {
  id: 'RFQ-1001',
  project: 'School Renovation',
  budget: 1250000,
  totalProcurementValue: 5810000,
  activeRfqs: 50,
  suppliersEvaluated: 5,
  potentialSavings: 74120,
  confidence: 94,
  coverage: 98,
  averageRiskScore: 21,
  recommendedSupplier: 'BuildTech Supply',
}

export const suppliers: Supplier[] = [
  { id: 'buildtech', name: 'BuildTech Supply', cost: 1120000, coverage: 98, deliveryDays: 32, risk: 'Low', score: 95, missingItems: 2, quoteCompleteness: 98, anomaly: 'None' },
  { id: 'apex', name: 'Apex Industrial Supply', cost: 1160000, coverage: 95, deliveryDays: 29, risk: 'Medium', score: 89, missingItems: 5, quoteCompleteness: 95, anomaly: 'Delivery variance' },
  { id: 'titan', name: 'Titan Construction Materials', cost: 1180000, coverage: 100, deliveryDays: 45, risk: 'Low', score: 87, missingItems: 0, quoteCompleteness: 100, anomaly: 'Long lead time' },
  { id: 'constructpro', name: 'ConstructPro Materials', cost: 1214000, coverage: 91, deliveryDays: 38, risk: 'Medium', score: 82, missingItems: 9, quoteCompleteness: 91, anomaly: '22% above concrete benchmark' },
  { id: 'metro', name: 'Metro Contractor Depot', cost: 1278000, coverage: 83, deliveryDays: 41, risk: 'Critical', score: 71, missingItems: 17, quoteCompleteness: 83, anomaly: 'Incomplete quote' },
]

export const agentActivity = [
  { name: 'Material Agent', status: 'Complete', duration: '1.2s', detail: '500 materials normalized', cost: '$0.0021' },
  { name: 'Supplier Agent', status: 'Complete', duration: '0.9s', detail: '5 suppliers matched', cost: '$0.0014' },
  { name: 'Risk Agent', status: 'Complete', duration: '1.5s', detail: '14 risks detected', cost: '$0.0027' },
  { name: 'Recommendation Agent', status: 'Complete', duration: '2.1s', detail: 'BuildTech selected', cost: '$0.0041' },
]

export const risks = [
  { supplier: 'Metro Contractor Depot', priority: 'Critical', issue: 'Missing 17 line items', impact: 'Coverage falls to 83%', mitigation: 'Request revised quote before approval' },
  { supplier: 'ConstructPro Materials', priority: 'Medium', issue: 'Concrete pricing 22% above market', impact: '$43k avoidable cost', mitigation: 'Negotiate concrete package' },
  { supplier: 'Titan Construction Materials', priority: 'Medium', issue: 'Delivery exceeds project timeline', impact: '13 day schedule risk', mitigation: 'Split award or require expedited shipping' },
  { supplier: 'Apex Industrial Supply', priority: 'Low', issue: 'Delivery variance across HVAC items', impact: 'Moderate schedule uncertainty', mitigation: 'Confirm SLA by line item' },
]

export const traces: TraceEvent[] = [
  { traceId: 'trc_1001', span: 'RFQ Uploaded', service: 'ingestion', operation: 'POST /rfq/upload', durationMs: 142, status: 'OK', timestamp: '10:02:11' },
  { traceId: 'trc_1001', span: 'Supplier Quotes Uploaded', service: 'ingestion', operation: 'POST /supplier/upload', durationMs: 388, status: 'OK', timestamp: '10:02:18' },
  { traceId: 'trc_1001', span: 'Material Normalized', service: 'material-agent', operation: 'normalize_materials', durationMs: 1208, status: 'OK', timestamp: '10:02:21' },
  { traceId: 'trc_1001', span: 'Suppliers Scored', service: 'supplier-agent', operation: 'score_suppliers', durationMs: 943, status: 'OK', timestamp: '10:02:23' },
  { traceId: 'trc_1001', span: 'Risks Calculated', service: 'risk-agent', operation: 'calculate_risk', durationMs: 1519, status: 'WARN', timestamp: '10:02:25' },
  { traceId: 'trc_1001', span: 'Recommendation Generated', service: 'recommendation-agent', operation: 'recommend_supplier', durationMs: 2104, status: 'OK', timestamp: '10:02:28' },
]

export const qualityChecks = [
  { test: 'not_null_rfq_id', model: 'stg_rfqs', status: 'pass', failures: 0 },
  { test: 'not_null_supplier_name', model: 'stg_suppliers', status: 'pass', failures: 0 },
  { test: 'positive_prices_only', model: 'stg_quotes', status: 'pass', failures: 0 },
  { test: 'unique_quote_id', model: 'stg_quotes', status: 'pass', failures: 0 },
  { test: 'valid_currency_values', model: 'stg_quotes', status: 'pass', failures: 0 },
  { test: 'coverage_threshold', model: 'fct_vendor_scores', status: 'warn', failures: 1 },
]

export const lineageNodes = [
  { id: 'rfq', label: 'RFQ', count: 50, layer: 'source' },
  { id: 'materials', label: 'Materials', count: 500, layer: 'staging' },
  { id: 'normalized', label: 'Normalized Materials', count: 500, layer: 'agent' },
  { id: 'quotes', label: 'Supplier Quotes', count: 2500, layer: 'staging' },
  { id: 'scores', label: 'Vendor Scores', count: 250, layer: 'mart' },
  { id: 'recommendation', label: 'Recommendation', count: 50, layer: 'mart' },
]

export const lineageEdges = [
  { source: 'rfq', target: 'materials' },
  { source: 'materials', target: 'normalized' },
  { source: 'normalized', target: 'scores' },
  { source: 'quotes', target: 'scores' },
  { source: 'scores', target: 'recommendation' },
]
