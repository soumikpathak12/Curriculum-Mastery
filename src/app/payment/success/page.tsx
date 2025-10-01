import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

interface PaymentSuccessPageProps {
  searchParams: {
    order_id?: string
  }
}

export default async function PaymentSuccessPage({ searchParams }: PaymentSuccessPageProps) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) {
    redirect('/login?callbackUrl=/payment/success')
  }

  const { order_id } = searchParams

  if (!order_id) {
    redirect('/dashboard')
  }

  // Get payment and enrollment details
  const payment = await prisma.payment.findUnique({
    where: { orderId: order_id },
    include: {
      user: true,
      enrollment: {
        include: {
          course: true
        }
      }
    }
  })

  if (!payment || payment.user.email !== session.user.email) {
    redirect('/dashboard')
  }

  const enrollment = payment.enrollment?.[0]
  const course = enrollment?.course

  return (
    <div className="min-h-screen bg-brand-background">
      {/* Header */}
      <div className="flex w-full items-center justify-between pl-4 pr-2 py-2 sm:pl-6 sm:pr-3 sm:py-3">
        <Link href="/" className="flex items-center gap-1 hover:opacity-90 transition-opacity">
          <Image 
            src="/assets/Curriculum Mastery Logo Small (1).png" 
            alt="Curriculum Mastery Logo" 
            width={288} 
            height={288} 
            className="h-[108px] w-auto sm:h-[144px]"
            priority
          />
          <div className="flex flex-col">
            <span className="text-xl sm:text-3xl font-bold text-brand-primary leading-tight tracking-wide">Curriculum</span>
            <span className="text-2xl sm:text-4xl font-bold text-brand-primary leading-tight uppercase">MASTERY</span>
          </div>
        </Link>
      </div>

      {/* Main Content */}
      <main className="flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            {payment.status === 'PAID' && enrollment ? (
              <>
                {/* Success Icon */}
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>

                <h1 className="text-3xl font-bold text-brand-primary mb-4">Payment Successful!</h1>
                <p className="text-gray-600 mb-6">
                  Congratulations! You have successfully enrolled in the course.
                </p>

                {course && (
                  <div className="bg-brand-background rounded-xl p-6 mb-8">
                    <h2 className="text-xl font-semibold text-brand-primary mb-2">{course.title}</h2>
                    <p className="text-gray-600 mb-4">{course.description}</p>
                    <div className="flex justify-center items-center gap-4 text-sm text-gray-500">
                      <span>Order ID: {payment.orderId}</span>
                      <span>•</span>
                      <span>Amount: ₹{(payment.amount / 100).toLocaleString()}</span>
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  <Link
                    href="/dashboard"
                    className="inline-block w-full rounded-xl bg-brand-primary px-6 py-4 text-lg font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    Go to Dashboard
                  </Link>
                  <Link
                    href="/"
                    className="inline-block w-full rounded-xl border-2 border-brand-primary px-6 py-4 text-lg font-semibold text-brand-primary hover:bg-brand-primary hover:text-white transition-all duration-200"
                  >
                    Back to Home
                  </Link>
                </div>
              </>
            ) : (
              <>
                {/* Pending/Failed Icon */}
                <div className="mx-auto w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>

                <h1 className="text-3xl font-bold text-brand-primary mb-4">Payment Processing</h1>
                <p className="text-gray-600 mb-6">
                  Your payment is being processed. Please check back in a few minutes.
                </p>

                <div className="space-y-4">
                  <Link
                    href="/dashboard"
                    className="inline-block w-full rounded-xl bg-brand-primary px-6 py-4 text-lg font-semibold text-white shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    Check Dashboard
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
