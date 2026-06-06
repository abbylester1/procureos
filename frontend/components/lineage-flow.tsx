'use client'

import { Background, Controls, ReactFlow } from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { lineageEdges, lineageNodes } from '@/lib/demo-data'

const nodes = lineageNodes.map((node, index) => ({
  id: node.id,
  position: { x: index * 230, y: index % 2 === 0 ? 40 : 170 },
  data: { label: `${node.label}\n${node.count} records` },
  style: { background: 'rgba(255,255,255,0.045)', color: '#EDF4FF', border: '0', borderRadius: 20, padding: 12, width: 180, whiteSpace: 'pre-line' },
}))

const edges = lineageEdges.map((edge, index) => ({ id: `e${index}`, source: edge.source, target: edge.target, animated: false, style: { stroke: 'rgba(109,93,252,0.55)' } }))

export function LineageFlow() {
  return (
    <div className="surface-muted h-[420px] overflow-hidden rounded-3xl">
      <ReactFlow nodes={nodes} edges={edges} fitView>
        <Background color="rgba(148,163,184,0.12)" />
        <Controls />
      </ReactFlow>
    </div>
  )
}
