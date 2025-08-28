import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import EnrollButton from '@/components/EnrollButton'
import ProgressToggle from '@/components/ProgressToggle'

export default async function CoursePage() {
  const course = await prisma.course.findFirst({
    include: {
      modules: { orderBy: { order: 'asc' }, include: { lessons: { orderBy: { order: 'asc' } } } },
      assignments: true,
    },
  })

  if (!course) {
    return (
      <main className="mx-auto max-w-5xl p-6">
        <h1 className="text-3xl font-bold">Course</h1>
        <p className="mt-2 text-gray-600">Course details coming soon.</p>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-5xl p-6">
      <div className="flex items-start justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold">{course.title}</h1>
          {course.description && <p className="mt-2 text-gray-600">{course.description}</p>}
          <p className="mt-3 text-gray-800">Price: {(course.price / 100).toLocaleString('en-IN', { style: 'currency', currency: course.currency })}</p>
          <div className="mt-6 flex gap-3">
            <EnrollButton />
            <Link href="/login" className="rounded border px-4 py-2">I already have an account</Link>
          </div>
        </div>
        <div className="rounded-md border p-4 w-full max-w-sm">
          <h2 className="font-semibold">Syllabus</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {course.modules.map((m) => (
              <li key={m.id}>
                <div className="font-medium">Module {m.order}: {m.title}</div>
                <div className="text-gray-600">{m.lessons.length} lessons</div>
                <ul className="mt-2 space-y-1">
                  {m.lessons.map((l) => (
                    <li key={l.id} className="flex items-center justify-between">
                      <span>• {l.title}</span>
                      <ProgressToggle lessonId={l.id} />
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  )
}
