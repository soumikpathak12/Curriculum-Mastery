import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
// Note: Cashfree integration will be configured later
// For now, we'll create a mock payment flow

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { courseId } = await req.json()
    if (!courseId) {
      return NextResponse.json({ error: 'Course ID required' }, { status: 400 })
    }

    // Get user and course details
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const course = await prisma.course.findUnique({
      where: { id: courseId }
    })

    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 })
    }

    // Check if user is already enrolled
    const existingEnrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId: user.id,
          courseId: course.id
        }
      }
    })

    if (existingEnrollment) {
      return NextResponse.json({ error: 'Already enrolled in this course' }, { status: 409 })
    }

    // Generate unique order ID
    const orderId = `order_${Date.now()}_${user.id.slice(-8)}`

    // Create payment record
    await prisma.payment.create({
      data: {
        orderId,
        amount: course.price,
        currency: course.currency,
        status: 'CREATED',
        userId: user.id,
        provider: 'cashfree'
      }
    })

    // For now, return mock payment data until Cashfree is properly configured
    // TODO: Replace with actual Cashfree integration
    return NextResponse.json({
      orderId,
      paymentSessionId: `mock_session_${orderId}`,
      orderToken: `mock_token_${orderId}`,
      mockPayment: true // Flag to indicate this is a mock payment
    })

  } catch (error) {
    console.error('Payment order creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create payment order' },
      { status: 500 }
    )
  }
}
