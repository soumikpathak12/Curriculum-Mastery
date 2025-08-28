import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { moduleId, title } = body as { moduleId: string; title: string }
    if (!moduleId || !title) {
      return NextResponse.json({ error: 'moduleId and title are required' }, { status: 400 })
    }

    const last = await prisma.lesson.findFirst({
      where: { moduleId },
      orderBy: { order: 'desc' },
      select: { order: true },
    })

    const lesson = await prisma.lesson.create({
      data: {
        moduleId,
        title,
        order: (last?.order ?? 0) + 1,
      },
    })

    return NextResponse.json({ lesson }, { status: 201 })
  } catch (e) {
    console.error('POST /api/admin/lessons error', e)
    return NextResponse.json({ error: 'Failed to create lesson' }, { status: 500 })
  }
}
