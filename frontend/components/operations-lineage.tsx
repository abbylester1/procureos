'use client'

import dynamic from 'next/dynamic'

const LineageFlow = dynamic(() => import('@/components/lineage-flow').then((mod) => mod.LineageFlow), { ssr: false })

export function OperationsLineage() {
  return <LineageFlow />
}
