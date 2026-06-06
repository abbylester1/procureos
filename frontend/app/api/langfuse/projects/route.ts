import { getLangfuseProjects } from '@/lib/langfuse'

export async function GET() {
  const result = await getLangfuseProjects()
  return Response.json(result)
}
