import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const { lessonId, direction } = (await req.json()) as { lessonId: string; direction: 'up' | 'down' }
    if (!lessonId || !direction) return NextResponse.json({ error: 'lessonId and direction are required' }, { status: 400 })

    const lesson = await prisma.lesson.findUnique({ where: { id: lessonId } })
    if (!lesson) return NextResponse.json({ error: 'Lesson not found' }, { status: 404 })

    const neighbor = await prisma.lesson.findFirst({
      where: {
        moduleId: lesson.moduleId,
        order: direction === 'up' ? { lt: lesson.order } : { gt: lesson.order },
      },
      orderBy: { order: direction === 'up' ? 'desc' : 'asc' },
    })
    if (!neighbor) return NextResponse.json({ ok: true })

    await prisma.$transaction([
      prisma.lesson.update({ where: { id: lesson.id }, data: { order: neighbor.order } }),
      prisma.lesson.update({ where: { id: neighbor.id }, data: { order: lesson.order } }),
    ])

    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('POST /api/admin/lessons/reorder error', e)
    return NextResponse.json({ error: 'Failed to reorder lesson' }, { status: 500 })
  }
}
