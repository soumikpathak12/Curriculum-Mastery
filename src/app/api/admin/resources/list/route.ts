import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { searchParams } = new URL(req.url)
  const lessonId = searchParams.get('lessonId')
  if (!lessonId) return NextResponse.json({ error: 'lessonId required' }, { status: 400 })

  try {
    const resources = await prisma.resource.findMany({
      where: { lessonId },
      orderBy: { filename: 'asc' },
    })
    return NextResponse.json({ resources })
  } catch (e) {
    console.error('GET /api/admin/resources/list error', e)
    return NextResponse.json({ error: 'Failed to fetch resources' }, { status: 500 })
  }
}
