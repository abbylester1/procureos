'use client'

import { Background, Controls, ReactFlow } from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { lineageEdges, lineageNodes } from '@/lib/demo-data'

const nodes = lineageNodes.map((node, index) => ({
  id: node.id,
  position: { x: index * 230, y: index % 2 === 0 ? 40 : 170 },
  data: { label: `${node.label}\n${node.count} records` },
  style: { background: '#FFFFFF', color: '#0F172A', border: '1px solid #E2E8F0', borderRadius: 16, padding: 12, width: 180, whiteSpace: 'pre-line', fontSize: 12, fontWeight: 600, boxShadow: '0 1px 3px rgba(15,23,42,0.08)' },
}))

const edges = lineageEdges.map((edge, index) => ({ id: `e${index}`, source: edge.source, target: edge.target, animated: false, style: { stroke: '#6D5DFC', strokeWidth: 2, opacity: 0.5 } }))

export function LineageFlow() {
  return (
    <div className="surface h-[420px] overflow-hidden rounded-3xl">
      <ReactFlow nodes={nodes} edges={edges} fitView>
        <Background color="rgba(148,163,184,0.15)" />
        <Controls />
      </ReactFlow>
    </div>
  )
}
