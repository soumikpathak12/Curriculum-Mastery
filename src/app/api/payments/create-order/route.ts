import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { Cashfree } from 'cashfree-pg'

// Initialize Cashfree
Cashfree.XClientId = process.env.CASHFREE_APP_ID!
Cashfree.XClientSecret = process.env.CASHFREE_SECRET_KEY!
Cashfree.XEnvironment = process.env.NODE_ENV === 'production' 
  ? Cashfree.Environment.PRODUCTION 
  : Cashfree.Environment.SANDBOX

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
    const payment = await prisma.payment.create({
      data: {
        orderId,
        amount: course.price,
        currency: course.currency,
        status: 'CREATED',
        userId: user.id,
        provider: 'cashfree'
      }
    })

    // Create Cashfree order
    const orderRequest = {
      order_id: orderId,
      order_amount: course.price / 100, // Convert paise to rupees
      order_currency: course.currency,
      customer_details: {
        customer_id: user.id,
        customer_name: user.name || user.email,
        customer_email: user.email,
        customer_phone: '9999999999' // Default phone number
      },
      order_meta: {
        return_url: `${process.env.NEXTAUTH_URL}/payment/success?order_id=${orderId}`,
        notify_url: `${process.env.NEXTAUTH_URL}/api/payments/webhook`
      }
    }

    const response = await Cashfree.PGCreateOrder('2023-08-01', orderRequest)
    
    if (response.data) {
      return NextResponse.json({
        orderId,
        paymentSessionId: response.data.payment_session_id,
        orderToken: response.data.order_token
      })
    } else {
      throw new Error('Failed to create Cashfree order')
    }

  } catch (error) {
    console.error('Payment order creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create payment order' },
      { status: 500 }
    )
  }
}
