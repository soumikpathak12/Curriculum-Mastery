import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await req.json().catch(() => ({}))
    const { title } = body as { title?: string }
    if (!title) return NextResponse.json({ error: 'title is required' }, { status: 400 })

    const updated = await prisma.module.update({ where: { id }, data: { title } })
    return NextResponse.json({ module: updated })
  } catch (e) {
    console.error('PATCH /api/admin/modules/[id] error', e)
    return NextResponse.json({ error: 'Failed to update module' }, { status: 500 })
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    await prisma.lesson.deleteMany({ where: { moduleId: id } })
    const deleted = await prisma.module.delete({ where: { id } })
    return NextResponse.json({ module: deleted })
  } catch (e) {
    console.error('DELETE /api/admin/modules/[id] error', e)
    return NextResponse.json({ error: 'Failed to delete module' }, { status: 500 })
  }
}
