import procurementDemo from '@/data/demo/procurement-demo.json'
import { agentActivity, qualityChecks, rfq, risks, suppliers, traces } from '@/lib/demo-data'

export async function POST() {
  return Response.json({
    status: 'loaded',
    message: 'Demo RFQ, five supplier quotes, agent traces, data quality checks, and recommendation loaded.',
    rfq,
    suppliers,
    risks,
    traces,
    qualityChecks,
    agentActivity,
    dataset: procurementDemo,
  })
}
