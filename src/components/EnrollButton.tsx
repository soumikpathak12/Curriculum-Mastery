"use client"

import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

export default function EnrollButton() {
  const router = useRouter()
  const { status } = useSession()

  const onClick = async () => {
    if (status !== 'authenticated') {
      router.push('/login?callbackUrl=/course')
      return
    }
    const res = await fetch('/api/enroll', { method: 'POST' })
    if (res.status === 401) {
      router.push('/login?callbackUrl=/course')
      return
    }
    if (!res.ok) {
      alert('Failed to enroll')
      return
    }
    router.push('/dashboard')
  }

  return (
    <button onClick={onClick} className="rounded bg-emerald-600 px-4 py-2 text-white">
      Enroll (free for now)
    </button>
  )
}
