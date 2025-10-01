"use client"

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

interface PaymentButtonProps {
  courseId: string
  amount: number
  className?: string
  children: React.ReactNode
}

declare global {
  interface Window {
    Cashfree: any
  }
}

export default function PaymentButton({ courseId, amount, className, children }: PaymentButtonProps) {
  const { data: session } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handlePayment = async () => {
    if (!session) {
      router.push('/register?enroll=1')
      return
    }

    setLoading(true)
    try {
      // Create payment order
      const response = await fetch('/api/payments/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseId })
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to create payment order')
      }

      const { orderId, paymentSessionId } = await response.json()

      // Load Cashfree SDK if not already loaded
      if (!window.Cashfree) {
        const script = document.createElement('script')
        script.src = process.env.NODE_ENV === 'production' 
          ? 'https://sdk.cashfree.com/js/v3/cashfree.js'
          : 'https://sdk.cashfree.com/js/v3/cashfree.sandbox.js'
        script.onload = () => initializePayment(paymentSessionId, orderId)
        document.head.appendChild(script)
      } else {
        initializePayment(paymentSessionId, orderId)
      }

    } catch (error) {
      console.error('Payment error:', error)
      alert(error instanceof Error ? error.message : 'Payment failed. Please try again.')
      setLoading(false)
    }
  }

  const initializePayment = (paymentSessionId: string, orderId: string) => {
    const cashfree = new window.Cashfree({
      mode: process.env.NODE_ENV === 'production' ? 'production' : 'sandbox'
    })

    cashfree.checkout({
      paymentSessionId,
      returnUrl: `${window.location.origin}/payment/success?order_id=${orderId}`,
      onSuccess: () => {
        router.push(`/payment/success?order_id=${orderId}`)
      },
      onFailure: (error: any) => {
        console.error('Payment failed:', error)
        alert('Payment failed. Please try again.')
        setLoading(false)
      }
    })
  }

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className={className}
    >
      {loading ? (
        <div className="flex items-center justify-center gap-2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          Processing...
        </div>
      ) : (
        children
      )}
    </button>
  )
}
