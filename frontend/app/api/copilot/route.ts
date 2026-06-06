import { NextRequest } from 'next/server'
import { rfq, suppliers, risks } from '@/lib/demo-data'

function fallbackAnswer(question: string) {
  const q = question.toLowerCase()
  if (q.includes('which supplier') || q.includes('select')) return `Select ${rfq.recommendedSupplier}. It has the best composite score, ${rfq.coverage}% coverage, low risk, and ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(rfq.potentialSavings)} in estimated savings.`
  if (q.includes('save')) return `ProcureOS estimates ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(rfq.potentialSavings)} in potential savings for the School Renovation RFQ.`
  if (q.includes('why')) return 'BuildTech was recommended because it combines the lowest qualified cost with 98% coverage, a 32-day delivery timeline, low risk, and high quote completeness.'
  if (q.includes('high risk')) return risks.filter((risk) => risk.priority !== 'Low').map((risk) => `${risk.supplier}: ${risk.issue}`).join('\n')
  if (q.includes('delivery')) return `${suppliers[1].name} has the best delivery timeline at ${suppliers[1].deliveryDays} days, but BuildTech is the stronger overall recommendation because it balances cost, risk, and coverage.`
  return 'ProcureOS recommends BuildTech Supply for the School Renovation RFQ based on cost, coverage, delivery confidence, and risk-adjusted supplier scoring.'
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const message = String(body.message || '')
  return Response.json({
    mode: process.env.OPENAI_API_KEY ? 'hybrid-ready' : 'deterministic-fallback',
    answer: fallbackAnswer(message),
    trace: { traceId: 'trc_copilot_1001', latencyMs: 312, model: process.env.OPENAI_API_KEY ? 'gpt-5-mini' : 'fallback-procurement-analyst' },
  })
}
