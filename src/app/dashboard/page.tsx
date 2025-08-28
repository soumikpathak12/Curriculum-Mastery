import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    redirect('/login?callbackUrl=/dashboard')
  }

  const user = await prisma.user.findUnique({ where: { email: session.user.email! } })
  if (!user) {
    return (
      <main className="mx-auto max-w-5xl p-6">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="mt-2 text-red-600">User not found.</p>
      </main>
    )
  }

  const enrollments = await prisma.enrollment.findMany({
    where: { userId: user.id },
    include: {
      course: {
        include: { modules: { include: { lessons: true } } },
      },
    },
    orderBy: { createdAt: 'desc' },
  })

  // Build a set of all lesson IDs across enrolled courses
  const allLessonIds = enrollments.flatMap((en) => en.course.modules.flatMap((m) => m.lessons.map((l) => l.id)))
  const completed = await prisma.lessonProgress.findMany({
    where: { userId: user.id, lessonId: { in: allLessonIds } },
    select: { lessonId: true },
  })
  const completedSet = new Set(completed.map((c: { lessonId: string }) => c.lessonId))

  return (
    <main className="mx-auto max-w-5xl p-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <p className="mt-2 text-gray-600">Welcome back{session.user.name ? `, ${session.user.name}` : ''}.</p>

      {enrollments.length === 0 ? (
        <div className="mt-6 rounded border p-4">
          <p className="text-gray-700">You are not enrolled yet.</p>
          <Link href="/course" className="mt-3 inline-block rounded bg-black px-4 py-2 text-white">Browse course</Link>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {enrollments.map((en) => {
            const lessons = en.course.modules.reduce((acc, m) => acc + m.lessons.length, 0)
            const completedCount = en.course.modules.reduce(
              (acc, m) => acc + m.lessons.filter((l) => completedSet.has(l.id)).length,
              0,
            )
            const pct = lessons > 0 ? Math.round((completedCount / lessons) * 100) : 0
            return (
              <div key={en.id} className="rounded border p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{en.course.title}</div>
                    <div className="text-sm text-gray-600">
                      {en.course.modules.length} modules • {lessons} lessons
                    </div>
                    <div className="mt-1 text-xs text-gray-500">Status: {en.status}</div>
                    <div className="mt-2 text-sm">
                      Progress: {completedCount}/{lessons} ({pct}%)
                    </div>
                  </div>
                  <Link href="/course" className="rounded border px-3 py-1.5 text-sm">View syllabus</Link>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </main>
  )
}
