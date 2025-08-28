import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const { moduleId, direction } = (await req.json()) as { moduleId: string; direction: 'up' | 'down' }
    if (!moduleId || !direction) return NextResponse.json({ error: 'moduleId and direction are required' }, { status: 400 })

    const mod = await prisma.module.findUnique({ where: { id: moduleId } })
    if (!mod) return NextResponse.json({ error: 'Module not found' }, { status: 404 })

    const neighbor = await prisma.module.findFirst({
      where: {
        courseId: mod.courseId,
        order: direction === 'up' ? { lt: mod.order } : { gt: mod.order },
      },
      orderBy: { order: direction === 'up' ? 'desc' : 'asc' },
    })
    if (!neighbor) return NextResponse.json({ ok: true })

    await prisma.$transaction([
      prisma.module.update({ where: { id: mod.id }, data: { order: neighbor.order } }),
      prisma.module.update({ where: { id: neighbor.id }, data: { order: mod.order } }),
    ])

    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('POST /api/admin/modules/reorder error', e)
    return NextResponse.json({ error: 'Failed to reorder module' }, { status: 500 })
  }
}
