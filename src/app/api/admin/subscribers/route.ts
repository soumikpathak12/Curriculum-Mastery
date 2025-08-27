// Admin: Subscribers API placeholder
// Methods: GET (list), POST (create)
import { NextRequest } from 'next/server'

export async function GET() {
  // TODO: fetch subscribers via Prisma
  return Response.json({ subscribers: [] })
}

export async function POST(req: NextRequest) {
  // TODO: create subscriber { email, name?, tags? }
  const _body = await req.json().catch(() => ({}))
  return Response.json({ ok: true }, { status: 201 })
}
