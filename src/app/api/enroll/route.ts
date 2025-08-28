import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({ where: { email: session.user.email } })
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })

    const course = await prisma.course.findFirst()
    if (!course) return NextResponse.json({ error: 'No course available' }, { status: 404 })

    await prisma.enrollment.upsert({
      where: { userId_courseId: { userId: user.id, courseId: course.id } },
      update: {},
      create: { userId: user.id, courseId: course.id },
    })

    return NextResponse.json({ ok: true, courseId: course.id })
  } catch (e) {
    console.error('POST /api/enroll error', e)
    return NextResponse.json({ error: 'Failed to enroll' }, { status: 500 })
  }
}
