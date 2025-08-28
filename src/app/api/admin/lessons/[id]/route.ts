import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const body = await req.json().catch(() => ({}))
    const { title } = body as { title?: string }
    if (!title) return NextResponse.json({ error: 'title is required' }, { status: 400 })

    const updated = await prisma.lesson.update({ where: { id }, data: { title } })
    return NextResponse.json({ lesson: updated })
  } catch (e) {
    console.error('PATCH /api/admin/lessons/[id] error', e)
    return NextResponse.json({ error: 'Failed to update lesson' }, { status: 500 })
  }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    await prisma.resource.deleteMany({ where: { lessonId: id } })
    const deleted = await prisma.lesson.delete({ where: { id } })
    return NextResponse.json({ lesson: deleted })
  } catch (e) {
    console.error('DELETE /api/admin/lessons/[id] error', e)
    return NextResponse.json({ error: 'Failed to delete lesson' }, { status: 500 })
  }
}
