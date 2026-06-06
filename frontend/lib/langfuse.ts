export type LangfuseProject = {
  id: string
  name?: string
  [key: string]: unknown
}

export async function getLangfuseProjects() {
  const publicKey = process.env.LANGFUSE_PUBLIC_KEY
  const secretKey = process.env.LANGFUSE_SECRET_KEY
  const host = process.env.LANGFUSE_HOST || 'https://cloud.langfuse.com'

  if (!publicKey || !secretKey) {
    return {
      mode: 'not-configured' as const,
      projects: [] as LangfuseProject[],
      message: 'Set LANGFUSE_PUBLIC_KEY and LANGFUSE_SECRET_KEY to read Langfuse projects.',
    }
  }

  const auth = Buffer.from(`${publicKey}:${secretKey}`).toString('base64')
  const response = await fetch(`${host.replace(/\/$/, '')}/api/public/projects`, {
    headers: {
      Authorization: `Basic ${auth}`,
      Accept: 'application/json',
    },
    cache: 'no-store',
  })

  if (!response.ok) {
    const text = await response.text()
    return {
      mode: 'error' as const,
      projects: [] as LangfuseProject[],
      status: response.status,
      message: text || response.statusText,
    }
  }

  const payload = await response.json()
  const projects = Array.isArray(payload) ? payload : Array.isArray(payload.data) ? payload.data : []
  return {
    mode: 'live' as const,
    projects: projects as LangfuseProject[],
    raw: payload,
  }
}
