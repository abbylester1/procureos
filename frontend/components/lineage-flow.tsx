'use client'

import { Background, Controls, ReactFlow } from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { lineageEdges, lineageNodes } from '@/lib/demo-data'

const nodes = lineageNodes.map((node, index) => ({
  id: node.id,
  position: { x: index * 230, y: index % 2 === 0 ? 40 : 170 },
  data: { label: `${node.label}\n${node.count} records` },
  style: { background: '#111A2F', color: '#EDF4FF', border: '1px solid #65E4C655', borderRadius: 18, padding: 12, width: 180, whiteSpace: 'pre-line' },
}))

const edges = lineageEdges.map((edge, index) => ({ id: `e${index}`, source: edge.source, target: edge.target, animated: true, style: { stroke: '#65E4C6' } }))

export function LineageFlow() {
  return (
    <div className="h-[420px] overflow-hidden rounded-3xl border border-border bg-panel">
      <ReactFlow nodes={nodes} edges={edges} fitView>
        <Background color="#1D2A44" />
        <Controls />
      </ReactFlow>
    </div>
  )
}
