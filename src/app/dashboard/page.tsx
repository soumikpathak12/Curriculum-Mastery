import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import PaymentButton from '@/components/PaymentButton'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    redirect('/login?callbackUrl=/dashboard')
  }

  const user = await prisma.user.findUnique({ where: { email: session.user.email! } })
  if (!user) {
    return (
      <div className="min-h-screen bg-brand-background">
        <Header />
        <main className="mx-auto max-w-5xl p-6">
          <h1 className="text-2xl font-semibold text-brand-primary">Dashboard</h1>
          <p className="mt-2 text-red-600">User not found.</p>
        </main>
      </div>
    )
  }

  // Get available courses
  const availableCourses = await prisma.course.findMany({
    include: { modules: { include: { lessons: true } } },
  })

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

  // Get courses not enrolled in
  const enrolledCourseIds = new Set(enrollments.map(e => e.courseId))
  const unenrolledCourses = availableCourses.filter(course => !enrolledCourseIds.has(course.id))

  return (
    <div className="min-h-screen bg-brand-background">
      <Header />
      <main className="mx-auto max-w-6xl p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-brand-primary">Dashboard</h1>
          <p className="mt-2 text-gray-600">Welcome back{session.user.name ? `, ${session.user.name}` : ''}!</p>
        </div>

        {/* Available Courses to Enroll */}
        {unenrolledCourses.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-brand-primary mb-4">Available Courses</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {unenrolledCourses.map((course) => {
                const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0)
                return (
                  <div key={course.id} className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-xl font-semibold text-brand-primary mb-2">{course.title}</h3>
                    <p className="text-gray-600 mb-4 text-sm">{course.description}</p>
                    <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                      <span>{course.modules.length} modules</span>
                      <span>{totalLessons} lessons</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-brand-primary">
                        ₹{(course.price / 100).toLocaleString()}
                      </span>
                      <PaymentButton
                        courseId={course.id}
                        amount={course.price}
                        className="rounded-xl bg-brand-primary px-4 py-2 text-sm font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-200"
                      >
                        Enroll Now
                      </PaymentButton>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Enrolled Courses */}
        {enrollments.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <h2 className="text-xl font-semibold text-brand-primary mb-2">No Enrollments Yet</h2>
            <p className="text-gray-600 mb-4">You haven&apos;t enrolled in any courses yet. Browse available courses above to get started!</p>
            <Link href="/" className="inline-block rounded-xl bg-brand-primary px-6 py-3 text-white font-semibold hover:shadow-lg transition-all">
              Browse Courses
            </Link>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-semibold text-brand-primary mb-4">My Courses</h2>
            <div className="space-y-6">
              {enrollments.map((en) => {
                const lessons = en.course.modules.reduce((acc, m) => acc + m.lessons.length, 0)
                const completedCount = en.course.modules.reduce(
                  (acc, m) => acc + m.lessons.filter((l) => completedSet.has(l.id)).length,
                  0,
                )
                const pct = lessons > 0 ? Math.round((completedCount / lessons) * 100) : 0
                return (
                  <div key={en.id} className="bg-white rounded-2xl shadow-lg p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-brand-primary mb-2">{en.course.title}</h3>
                        <p className="text-gray-600 mb-3">{en.course.description}</p>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-3">
                          <span>{en.course.modules.length} modules</span>
                          <span>{lessons} lessons</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            en.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {en.status}
                          </span>
                        </div>
                        <div className="mb-3">
                          <div className="flex justify-between text-sm mb-1">
                            <span>Progress</span>
                            <span>{completedCount}/{lessons} ({pct}%)</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-brand-primary h-2 rounded-full transition-all duration-300" 
                              style={{ width: `${pct}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Link 
                          href={`/course/${en.course.slug}`} 
                          className="rounded-xl bg-brand-primary px-6 py-3 text-white font-semibold text-center hover:shadow-lg transition-all"
                        >
                          Continue Learning
                        </Link>
                        <Link 
                          href={`/course/${en.course.slug}/syllabus`} 
                          className="rounded-xl border-2 border-brand-primary px-6 py-3 text-brand-primary font-semibold text-center hover:bg-brand-primary hover:text-white transition-all"
                        >
                          View Syllabus
                        </Link>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
