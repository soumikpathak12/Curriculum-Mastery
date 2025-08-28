import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // For now, return the first course with its structure
    const course = await prisma.course.findFirst({
      include: {
        modules: {
          orderBy: { order: 'asc' },
          include: {
            lessons: {
              orderBy: { order: 'asc' },
              include: { resources: true },
            },
          },
        },
        assignments: true,
      },
    })

    return NextResponse.json({ course })
  } catch (e) {
    console.error('GET /api/admin/course/tree error', e)
    return NextResponse.json({ error: 'Failed to load course' }, { status: 500 })
  }
}
