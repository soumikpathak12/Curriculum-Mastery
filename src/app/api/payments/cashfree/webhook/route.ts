import { NextRequest, NextResponse } from 'next/server';

// Cashfree webhook handler
export async function POST(req: NextRequest) {
  try {
    const event = await req.json();
    // You should verify the webhook signature here for security (see Cashfree docs)
    // Example: event.event, event.data.order.order_id, event.data.order.order_status

    // TODO: Update your database or perform business logic based on payment status
    // For now, just log the event
    console.log('Cashfree webhook event:', event);

    return NextResponse.json({ status: 'ok' });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Webhook error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
