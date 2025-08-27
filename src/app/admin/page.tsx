export default function AdminHome() {
  return (
    <main className="mx-auto max-w-5xl p-6">
      <h1 className="text-2xl font-semibold">Admin Portal</h1>
      <ul className="mt-4 list-disc pl-6 text-blue-700">
        <li><a href="/admin/course">Manage Course</a></li>
        <li><a href="/admin/assignments">Assignments</a></li>
        <li><a href="/admin/payments">Payments</a></li>
        <li><a href="/admin/subscribers">Subscribers</a></li>
        <li><a href="/admin/newsletter">Newsletter</a></li>
      </ul>
    </main>
  )
}
