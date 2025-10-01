'use client'

import { useState } from 'react'

export default function AdminHome() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const cleanupCourses = async () => {
    setLoading(true)
    setMessage('')
    try {
      const response = await fetch('/api/admin/cleanup-courses', {
        method: 'POST',
      })
      const data = await response.json()
      if (response.ok) {
        setMessage(`✅ ${data.message}`)
      } else {
        setMessage(`❌ ${data.error}`)
      }
    } catch {
      setMessage('❌ Failed to cleanup courses')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="mx-auto max-w-5xl p-6">
      <h1 className="text-2xl font-semibold">Admin Portal</h1>
      
      {/* Course Cleanup Section */}
      <div className="mt-6 p-4 border rounded-lg bg-yellow-50">
        <h2 className="text-lg font-semibold mb-2">Database Cleanup</h2>
        <p className="text-sm text-gray-600 mb-4">
          Remove the old &quot;Foundations of Design&quot; course and replace it with the IB & IGCSE Music Educators Course.
        </p>
        <button
          onClick={cleanupCourses}
          disabled={loading}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
        >
          {loading ? 'Cleaning up...' : 'Remove Old Course'}
        </button>
        {message && (
          <div className="mt-2 p-2 rounded bg-gray-100">
            {message}
          </div>
        )}
      </div>

      <ul className="mt-6 list-disc pl-6 text-blue-700">
        <li><a href="/admin/course">Manage Course</a></li>
        <li><a href="/admin/assignments">Assignments</a></li>
        <li><a href="/admin/payments">Payments</a></li>
        <li><a href="/admin/subscribers">Subscribers</a></li>
        <li><a href="/admin/newsletter">Newsletter</a></li>
      </ul>
    </main>
  )
}
