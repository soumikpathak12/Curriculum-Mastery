export default function CoursePage() {
  return (
    <main className="mx-auto max-w-5xl p-6">
      <h1 className="text-3xl font-bold">Course</h1>
      <p className="mt-2 text-gray-600">Course overview and syllabus will appear here.</p>
      <div className="mt-6 flex gap-3">
        <a href="/login" className="rounded bg-black px-4 py-2 text-white">Login</a>
        <a href="/register" className="rounded border px-4 py-2">Register</a>
      </div>
    </main>
  )
}
