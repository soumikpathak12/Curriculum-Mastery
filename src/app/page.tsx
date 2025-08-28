import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export default async function Home() {
  const course = await prisma.course.findFirst({
    include: { modules: { include: { lessons: true } } },
  })

  return (
    <div className="min-h-screen bg-white">
      <header className="mx-auto flex max-w-6xl items-center justify-between p-6">
        <Link href="/" className="text-lg font-semibold">Pratik Kulgod</Link>
        <nav className="flex items-center gap-3">
          <Link className="rounded border px-4 py-2" href="/login">Login</Link>
          <Link className="rounded bg-black px-4 py-2 text-white" href="/register">Register</Link>
        </nav>
      </header>

      <main className="mx-auto max-w-6xl p-6">
        {/* Hero */}
        <section className="mt-4 rounded-2xl bg-gradient-to-b from-gray-50 to-white p-6 ring-1 ring-gray-100 sm:p-10">
          <div className="grid gap-10 sm:grid-cols-2 sm:items-center">
          <div>
            <span className="inline-block rounded-full border px-3 py-1 text-xs text-gray-600">Beginner friendly</span>
            <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">Master Your Music Journey</h1>
            <p className="mt-4 text-lg leading-relaxed text-gray-600">
              Learn fundamentals through structured modules, practical assignments, and downloadable resources.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/register" className="rounded bg-black px-6 py-3 text-white">Get Started</Link>
              <Link href="/course" className="rounded border px-6 py-3">View Course</Link>
            </div>
          </div>
          <div className="rounded-xl border p-5 shadow-sm">
            <h2 className="text-lg font-semibold">Course Preview</h2>
            {course ? (
              <div className="mt-3 space-y-2 text-sm">
                <div className="text-gray-800">{course.title}</div>
                <div className="text-gray-600">{course.modules.length} modules • {course.modules.reduce((acc, m) => acc + m.lessons.length, 0)} lessons</div>
                <div className="text-gray-600">Price: {(course.price / 100).toLocaleString('en-IN', { style: 'currency', currency: course.currency })}</div>
              </div>
            ) : (
              <p className="mt-3 text-sm text-gray-600">Course details coming soon.</p>
            )}
          </div>
          </div>
        </section>

        {/* Features */}
        <section className="mt-16">
          <h2 className="text-center text-2xl font-semibold">Everything you need to learn fast</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border p-5">
              <div className="text-2xl">🎯</div>
              <div className="mt-2 font-medium">Structured modules</div>
              <p className="mt-1 text-sm text-gray-600">Progress step-by-step with clear outcomes.</p>
            </div>
            <div className="rounded-xl border p-5">
              <div className="text-2xl">📝</div>
              <div className="mt-2 font-medium">Practical assignments</div>
              <p className="mt-1 text-sm text-gray-600">Apply concepts with guided tasks.</p>
            </div>
            <div className="rounded-xl border p-5">
              <div className="text-2xl">⬇️</div>
              <div className="mt-2 font-medium">Downloadable resources</div>
              <p className="mt-1 text-sm text-gray-600">Keep references and materials offline.</p>
            </div>
          </div>
        </section>

        {course && (
          <section className="mt-12">
            <h3 className="text-xl font-semibold">What you&apos;ll learn</h3>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {course.modules.map((m) => (
                <li key={m.id} className="rounded-md border p-4">
                  <div className="font-medium">{m.title}</div>
                  <div className="text-sm text-gray-600">{m.lessons.length} lessons</div>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Testimonial */}
        <section className="mt-16 rounded-2xl bg-gray-50 p-6 ring-1 ring-gray-100 sm:p-10">
          <figure className="mx-auto max-w-3xl text-center">
            <blockquote className="text-lg text-gray-700">
              “Clear, concise and practical. I went from confused to confident in weeks.”
            </blockquote>
            <figcaption className="mt-3 text-sm text-gray-500">— Student, recent cohort</figcaption>
          </figure>
        </section>

      </main>

      <footer className="mt-16 border-t">
        <div className="mx-auto flex max-w-6xl items-center justify-between p-6 text-sm text-gray-500">
          <span>© {new Date().getFullYear()} Pratik Kulgod</span>
          <Link className="underline" href="/newsletter">Join newsletter</Link>
        </div>
      </footer>
    </div>
  )
}
