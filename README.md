# ProcureOS

## AI Procurement Command Center

ProcureOS helps procurement teams compare supplier quotes, identify risks, reduce procurement costs, and make confident purchasing decisions using AI.

Unlike traditional procurement software, every recommendation is explainable, traceable, and auditable.

## Demo Narrative

A procurement manager uploads one RFQ and five supplier quotes for a School Renovation project. ProcureOS runs AI-style agents to normalize materials, match suppliers, calculate risk, and recommend the best vendor.

Demo outcome:

- Recommended Supplier: BuildTech Supply
- Potential Savings: $74,120
- Confidence: 94%
- Coverage: 98%
- Risk: Low

## Vercel-First App

The judge-facing application lives in `frontend/` and is designed for Vercel deployment.

Stack:

- Next.js App Router
- TypeScript
- Tailwind
- Recharts
- React Flow
- Vercel AI SDK-ready Copilot route
- Deterministic fallback mode when no AI/API secrets are configured
- Precomputed dbt artifacts for data quality, lineage, and run results

## Product Screens

- Overview: executive procurement dashboard
- Suppliers: supplier comparison center
- Recommendations: AI-generated decision screen
- Risks: procurement risk monitoring
- Copilot: AI procurement assistant
- Operations: traces, agent activity, dbt quality, lineage, and audit trail

## Local Development

```bash
cd frontend
cp .env.example .env.local
npm install
npm run dev
```

Open http://localhost:3000.

## Production Build

```bash
cd frontend
npm install
npm run build
npm run start
```

## Vercel Deployment

1. Create or share a GitHub repo for ProcureOS.
2. Push this project to GitHub.
3. Import the repo into Vercel.
4. Set the Vercel project root to `frontend/`.
5. Use the Next.js framework preset.
6. Build command: `npm run build`.
7. Install command: `npm install`.
8. Optional env vars:
   - `OPENAI_API_KEY`
   - `OPENAI_MODEL`
   - `LANGFUSE_PUBLIC_KEY`
   - `LANGFUSE_SECRET_KEY`
   - `LANGFUSE_HOST`
   - `POSTGRES_URL`
   - `NEXT_PUBLIC_APP_URL`

The app works without optional secrets using deterministic demo mode.

## Langfuse Public API

ProcureOS includes a Vercel route that mirrors the Langfuse Public API project lookup:

```bash
curl -u public-key:secret-key https://cloud.langfuse.com/api/public/projects
```

In the app, configure:

```bash
LANGFUSE_PUBLIC_KEY=pk-lf-...
LANGFUSE_SECRET_KEY=sk-lf-...
LANGFUSE_HOST=https://cloud.langfuse.com
```

Then call:

```bash
curl http://localhost:3000/api/langfuse/projects
```

The Operations Center displays whether Langfuse is live, not configured, or returning an API error.

## DataOps / dbt

The dbt project lives in `dbt/procureos` and includes staging, intermediate, and mart models for procurement intelligence.

Vercel reads precomputed artifacts from:

```text
frontend/data/artifacts/
```

Artifacts include:

- `dbt-quality-summary.json`
- `dbt-lineage.json`
- `dbt-run-results.json`

## Optional Local Backend Prototype

`backend/` contains an earlier FastAPI prototype for ingestion, scoring, tracing, and sample data generation. It is useful as a local reference, but the deployed MVP is the Vercel app in `frontend/`.
