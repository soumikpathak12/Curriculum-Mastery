import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Cashfree } from 'cashfree-pg'
import crypto from 'crypto'

// Initialize Cashfree
Cashfree.XClientId = process.env.CASHFREE_APP_ID!
Cashfree.XClientSecret = process.env.CASHFREE_SECRET_KEY!
Cashfree.XEnvironment = process.env.NODE_ENV === 'production' 
  ? Cashfree.Environment.PRODUCTION 
  : Cashfree.Environment.SANDBOX

function verifyWebhookSignature(rawBody: string, signature: string, timestamp: string): boolean {
  const signedPayload = timestamp + rawBody
  const expectedSignature = crypto
    .createHmac('sha256', process.env.CASHFREE_SECRET_KEY!)
    .update(signedPayload)
    .digest('base64')
  
  return expectedSignature === signature
}

export async function POST(req: Request) {
  try {
    const rawBody = await req.text()
    const signature = req.headers.get('x-webhook-signature')
    const timestamp = req.headers.get('x-webhook-timestamp')

    if (!signature || !timestamp) {
      return NextResponse.json({ error: 'Missing webhook headers' }, { status: 400 })
    }

    // Verify webhook signature
    if (!verifyWebhookSignature(rawBody, signature, timestamp)) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }

    const webhookData = JSON.parse(rawBody)
    const { type, data } = webhookData

    if (type === 'PAYMENT_SUCCESS_WEBHOOK') {
      const { order_id, payment_status, order_amount } = data.order

      // Update payment status
      const payment = await prisma.payment.update({
        where: { orderId: order_id },
        data: { status: payment_status }
      })

      if (payment_status === 'PAID') {
        // Get course details
        const course = await prisma.course.findFirst({
          where: { price: Math.round(order_amount * 100) } // Convert rupees to paise
        })

        if (course) {
          // Create enrollment
          await prisma.enrollment.create({
            data: {
              userId: payment.userId,
              courseId: course.id,
              status: 'ACTIVE',
              paymentId: payment.id
            }
          })
        }
      }
    }

    return NextResponse.json({ status: 'success' })
  } catch (error) {
    console.error('Webhook processing error:', error)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}
