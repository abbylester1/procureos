import procurementDemo from '@/data/demo/procurement-demo.json'
import { rfq, suppliers, risks, traces, qualityChecks, lineageNodes, lineageEdges } from '@/lib/demo-data'

export async function GET() {
  return Response.json({
    rfq,
    suppliers,
    risks,
    traces,
    qualityChecks,
    lineage: { nodes: lineageNodes, edges: lineageEdges },
    demoDataset: procurementDemo,
  })
}
