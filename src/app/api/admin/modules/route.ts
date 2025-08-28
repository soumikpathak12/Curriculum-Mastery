import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { courseId, title } = body as { courseId: string; title: string }
    if (!courseId || !title) {
      return NextResponse.json({ error: 'courseId and title are required' }, { status: 400 })
    }

    // determine next order within course
    const last = await prisma.module.findFirst({
      where: { courseId },
      orderBy: { order: 'desc' },
      select: { order: true },
    })

    const mod = await prisma.module.create({
      data: {
        courseId,
        title,
        order: (last?.order ?? 0) + 1,
      },
    })

    return NextResponse.json({ module: mod }, { status: 201 })
  } catch (e) {
    console.error('POST /api/admin/modules error', e)
    return NextResponse.json({ error: 'Failed to create module' }, { status: 500 })
  }
}
