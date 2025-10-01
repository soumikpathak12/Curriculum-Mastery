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

    // Check if user is admin
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 })
    }

    // Delete the old "Foundations of Design" course and all related data
    const oldCourse = await prisma.course.findUnique({
      where: { slug: 'foundations-of-design' },
      include: {
        modules: {
          include: {
            lessons: {
              include: {
                resources: true,
                LessonProgress: true
              }
            }
          }
        },
        enrollments: true,
        assignments: {
          include: {
            submissions: true
          }
        }
      }
    })

    if (oldCourse) {
      // Delete in correct order to avoid foreign key constraints
      
      // Delete lesson progress
      for (const courseModule of oldCourse.modules) {
        for (const lesson of courseModule.lessons) {
          await prisma.lessonProgress.deleteMany({
            where: { lessonId: lesson.id }
          })
        }
      }

      // Delete resources
      for (const courseModule of oldCourse.modules) {
        for (const lesson of courseModule.lessons) {
          await prisma.resource.deleteMany({
            where: { lessonId: lesson.id }
          })
        }
      }

      // Delete lessons
      for (const courseModule of oldCourse.modules) {
        await prisma.lesson.deleteMany({
          where: { moduleId: courseModule.id }
        })
      }

      // Delete modules
      await prisma.module.deleteMany({
        where: { courseId: oldCourse.id }
      })

      // Delete submissions
      for (const assignment of oldCourse.assignments) {
        await prisma.submission.deleteMany({
          where: { assignmentId: assignment.id }
        })
      }

      // Delete assignments
      await prisma.assignment.deleteMany({
        where: { courseId: oldCourse.id }
      })

      // Delete enrollments
      await prisma.enrollment.deleteMany({
        where: { courseId: oldCourse.id }
      })

      // Finally delete the course
      await prisma.course.delete({
        where: { id: oldCourse.id }
      })

      return NextResponse.json({ 
        message: 'Successfully deleted Foundations of Design course',
        deletedCourse: oldCourse.title
      })
    } else {
      return NextResponse.json({ 
        message: 'Foundations of Design course not found'
      })
    }

  } catch (error) {
    console.error('Course cleanup error:', error)
    return NextResponse.json(
      { error: 'Failed to cleanup courses' },
      { status: 500 }
    )
  }
}
