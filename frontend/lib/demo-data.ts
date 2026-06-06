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

export type AuditLog = {
  id: string
  action: string
  actor: string
  resource: string
  detail: string
  timestamp: string
  severity: 'info' | 'warn' | 'critical'
}

export type AgentRun = {
  id: string
  name: string
  status: 'running' | 'complete' | 'failed' | 'queued'
  startedAt: string
  duration: string
  tokensUsed: number
  cost: string
  model: string
  output: string
  steps: { label: string; durationMs: number; status: 'ok' | 'warn' | 'error' }[]
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

export const agentRuns: AgentRun[] = [
  {
    id: 'run_001',
    name: 'Material Normalization Agent',
    status: 'complete',
    startedAt: '10:21:04 AM',
    duration: '1.2s',
    tokensUsed: 4821,
    cost: '$0.0021',
    model: 'claude-sonnet-4-6',
    output: 'Normalized 500 line items across 5 supplier quotes. Mapped 498 items to master material catalog. Flagged 2 items for manual review.',
    steps: [
      { label: 'Load RFQ line items', durationMs: 84, status: 'ok' },
      { label: 'Fetch material catalog', durationMs: 112, status: 'ok' },
      { label: 'Run normalization model', durationMs: 840, status: 'ok' },
      { label: 'Write results to staging', durationMs: 164, status: 'ok' },
    ],
  },
  {
    id: 'run_002',
    name: 'Supplier Scoring Agent',
    status: 'complete',
    startedAt: '10:22:18 AM',
    duration: '0.9s',
    tokensUsed: 3204,
    cost: '$0.0014',
    model: 'claude-sonnet-4-6',
    output: 'Scored 5 suppliers across 8 dimensions. BuildTech Supply achieved highest composite score of 95. Metro Contractor Depot ranked last at 71 due to incomplete quote.',
    steps: [
      { label: 'Load normalized quotes', durationMs: 68, status: 'ok' },
      { label: 'Apply scoring rubric', durationMs: 620, status: 'ok' },
      { label: 'Rank suppliers', durationMs: 142, status: 'ok' },
      { label: 'Persist scores', durationMs: 70, status: 'ok' },
    ],
  },
  {
    id: 'run_003',
    name: 'Risk Detection Agent',
    status: 'complete',
    startedAt: '10:23:05 AM',
    duration: '1.5s',
    tokensUsed: 6102,
    cost: '$0.0027',
    model: 'claude-sonnet-4-6',
    output: 'Detected 4 risks across 3 suppliers. 1 critical: Metro missing 17 line items. 2 medium: ConstructPro over-priced on concrete, Titan delivery delay. 1 low: Apex HVAC variance.',
    steps: [
      { label: 'Load supplier scores', durationMs: 74, status: 'ok' },
      { label: 'Run anomaly detection', durationMs: 920, status: 'warn' },
      { label: 'Classify risk severity', durationMs: 380, status: 'ok' },
      { label: 'Write risk report', durationMs: 126, status: 'ok' },
    ],
  },
  {
    id: 'run_004',
    name: 'Recommendation Agent',
    status: 'complete',
    startedAt: '10:24:31 AM',
    duration: '2.1s',
    tokensUsed: 9440,
    cost: '$0.0041',
    model: 'claude-sonnet-4-6',
    output: 'Recommended BuildTech Supply. Justification: highest composite score (95), lowest risk-adjusted cost ($1,120,000), 98% coverage, 32-day delivery meets SLA, no critical risks.',
    steps: [
      { label: 'Aggregate all agent outputs', durationMs: 112, status: 'ok' },
      { label: 'Generate decision rationale', durationMs: 1480, status: 'ok' },
      { label: 'Validate confidence threshold', durationMs: 340, status: 'ok' },
      { label: 'Publish recommendation', durationMs: 168, status: 'ok' },
    ],
  },
]

export const risks = [
  { supplier: 'Metro Contractor Depot', priority: 'Critical', issue: 'Missing 17 line items', impact: 'Coverage falls to 83%', mitigation: 'Request revised quote before approval' },
  { supplier: 'ConstructPro Materials', priority: 'Medium', issue: 'Concrete pricing 22% above market', impact: '$43k avoidable cost', mitigation: 'Negotiate concrete package' },
  { supplier: 'Titan Construction Materials', priority: 'Medium', issue: 'Delivery exceeds project timeline', impact: '13 day schedule risk', mitigation: 'Split award or require expedited shipping' },
  { supplier: 'Apex Industrial Supply', priority: 'Low', issue: 'Delivery variance across HVAC items', impact: 'Moderate schedule uncertainty', mitigation: 'Confirm SLA by line item' },
]

export const traces: TraceEvent[] = [
  { traceId: 'trc_1001', span: 'RFQ Uploaded', service: 'ingestion', operation: 'POST /rfq/upload', durationMs: 142, status: 'OK', timestamp: '10:21:04' },
  { traceId: 'trc_1001', span: 'Supplier Quotes Uploaded', service: 'ingestion', operation: 'POST /supplier/upload', durationMs: 388, status: 'OK', timestamp: '10:21:18' },
  { traceId: 'trc_1001', span: 'Material Normalized', service: 'material-agent', operation: 'normalize_materials', durationMs: 1208, status: 'OK', timestamp: '10:22:04' },
  { traceId: 'trc_1001', span: 'Suppliers Scored', service: 'supplier-agent', operation: 'score_suppliers', durationMs: 943, status: 'OK', timestamp: '10:23:05' },
  { traceId: 'trc_1001', span: 'Risks Calculated', service: 'risk-agent', operation: 'calculate_risk', durationMs: 1519, status: 'WARN', timestamp: '10:23:18' },
  { traceId: 'trc_1001', span: 'Recommendation Generated', service: 'recommendation-agent', operation: 'recommend_supplier', durationMs: 2104, status: 'OK', timestamp: '10:24:31' },
  { traceId: 'trc_1001', span: 'Result Published', service: 'api-gateway', operation: 'POST /recommendation/publish', durationMs: 67, status: 'OK', timestamp: '10:24:33' },
  { traceId: 'trc_1002', span: 'Copilot Query', service: 'copilot', operation: 'POST /copilot/query', durationMs: 312, status: 'OK', timestamp: '10:25:44' },
]

export const qualityChecks = [
  { test: 'not_null_rfq_id', model: 'stg_rfqs', status: 'pass', failures: 0, rowsTested: 50 },
  { test: 'not_null_supplier_name', model: 'stg_suppliers', status: 'pass', failures: 0, rowsTested: 5 },
  { test: 'positive_prices_only', model: 'stg_quotes', status: 'pass', failures: 0, rowsTested: 2500 },
  { test: 'unique_quote_id', model: 'stg_quotes', status: 'pass', failures: 0, rowsTested: 2500 },
  { test: 'valid_currency_values', model: 'stg_quotes', status: 'pass', failures: 0, rowsTested: 2500 },
  { test: 'coverage_threshold', model: 'fct_vendor_scores', status: 'warn', failures: 1, rowsTested: 250 },
  { test: 'delivery_days_positive', model: 'stg_suppliers', status: 'pass', failures: 0, rowsTested: 5 },
  { test: 'score_range_0_100', model: 'fct_vendor_scores', status: 'pass', failures: 0, rowsTested: 250 },
]

export const auditLogs: AuditLog[] = [
  { id: 'aud_001', action: 'RFQ Created', actor: 'Olivia Carter', resource: 'RFQ-1001', detail: 'Created School Renovation RFQ with budget $1.25M', timestamp: '10:20:51 AM', severity: 'info' },
  { id: 'aud_002', action: 'File Uploaded', actor: 'Olivia Carter', resource: 'RFQ-1001', detail: 'Uploaded school_renovation_rfq.xlsx (2.4 MB)', timestamp: '10:21:04 AM', severity: 'info' },
  { id: 'aud_003', action: 'Quotes Uploaded', actor: 'System', resource: 'RFQ-1001', detail: '5 supplier quote packages ingested automatically', timestamp: '10:21:18 AM', severity: 'info' },
  { id: 'aud_004', action: 'Agent Run Started', actor: 'System', resource: 'run_001', detail: 'Material Normalization Agent triggered for RFQ-1001', timestamp: '10:21:58 AM', severity: 'info' },
  { id: 'aud_005', action: 'Risk Flag Raised', actor: 'Risk Agent', resource: 'Metro Contractor Depot', detail: 'Critical: 17 line items missing from quote package', timestamp: '10:23:18 AM', severity: 'critical' },
  { id: 'aud_006', action: 'Risk Flag Raised', actor: 'Risk Agent', resource: 'ConstructPro Materials', detail: 'Medium: Concrete pricing 22% above market benchmark', timestamp: '10:23:21 AM', severity: 'warn' },
  { id: 'aud_007', action: 'Recommendation Generated', actor: 'Recommendation Agent', resource: 'RFQ-1001', detail: 'BuildTech Supply selected with 94% confidence', timestamp: '10:24:31 AM', severity: 'info' },
  { id: 'aud_008', action: 'Copilot Queried', actor: 'Olivia Carter', resource: 'RFQ-1001', detail: 'Query: "Which supplier should I select?"', timestamp: '10:25:44 AM', severity: 'info' },
  { id: 'aud_009', action: 'Report Viewed', actor: 'Olivia Carter', resource: 'RFQ-1001', detail: 'Opened full supplier comparison report', timestamp: '10:26:12 AM', severity: 'info' },
  { id: 'aud_010', action: 'Approval Pending', actor: 'System', resource: 'RFQ-1001', detail: 'Recommendation awaiting Olivia Carter approval', timestamp: '10:26:15 AM', severity: 'warn' },
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
