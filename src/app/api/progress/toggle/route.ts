import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { lessonId } = await req.json()
    if (!lessonId || typeof lessonId !== 'string') {
      return NextResponse.json({ error: 'lessonId required' }, { status: 400 })
    }

    const user = await prisma.user.findUnique({ where: { email: session.user.email } })
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })

    // Toggle logic: if exists -> delete, else -> create
    const existing = await prisma.lessonProgress.findUnique({
      where: { userId_lessonId: { userId: user.id, lessonId } },
    })

    if (existing) {
      await prisma.lessonProgress.delete({ where: { id: existing.id } })
      return NextResponse.json({ completed: false })
    }

    await prisma.lessonProgress.create({ data: { userId: user.id, lessonId } })
    return NextResponse.json({ completed: true })
  } catch (e) {
    console.error('POST /api/progress/toggle error', e)
    return NextResponse.json({ error: 'Failed to toggle progress' }, { status: 500 })
  }
}
