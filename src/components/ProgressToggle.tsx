"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

export default function ProgressToggle({ lessonId }: { lessonId: string }) {
  const { status } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [completed, setCompleted] = useState(false)

  useEffect(() => {
    let active = true
    ;(async () => {
      if (status !== 'authenticated') return
      try {
        const res = await fetch('/api/progress', { cache: 'no-store' })
        if (!res.ok) return
        const data = await res.json()
        if (!active) return
        setCompleted(Boolean(data?.progress?.[lessonId]))
      } catch {}
    })()
    return () => {
      active = false
    }
  }, [lessonId, status])

  const toggle = async () => {
    if (status !== 'authenticated') {
      router.push('/login?callbackUrl=/course')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/progress/toggle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lessonId }),
      })
      if (res.status === 401) {
        router.push('/login?callbackUrl=/course')
        return
      }
      const data = await res.json()
      setCompleted(Boolean(data?.completed))
    } catch {
      // noop
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={toggle}
      disabled={loading}
      className={`inline-flex items-center gap-2 rounded border px-2 py-1 text-xs ${completed ? 'bg-emerald-50 border-emerald-300 text-emerald-700' : ''}`}
      aria-pressed={completed}
    >
      <span>{completed ? 'Completed' : 'Mark complete'}</span>
    </button>
  )
}
