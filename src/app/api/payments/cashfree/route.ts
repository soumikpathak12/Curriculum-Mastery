import { NextRequest, NextResponse } from 'next/server';
import { Cashfree } from 'cashfree-pg';

// Set your Cashfree credentials here or use environment variables
const clientId = process.env.CASHFREE_CLIENT_ID || 'YOUR_CLIENT_ID';
const clientSecret = process.env.CASHFREE_CLIENT_SECRET || 'YOUR_CLIENT_SECRET';
const env = process.env.CASHFREE_ENV || 'TEST'; // 'TEST' or 'PROD'

Cashfree.XClientId = clientId;
Cashfree.XClientSecret = clientSecret;
Cashfree.XEnvironment = env;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    // Example: { orderId, orderAmount, customerName, customerEmail, customerPhone }
    const orderPayload = {
      order_id: body.orderId,
      order_amount: body.orderAmount,
      order_currency: 'INR',
      customer_details: {
        customer_id: body.orderId,
        customer_name: body.customerName,
        customer_email: body.customerEmail,
        customer_phone: body.customerPhone,
      },
      order_meta: {
        return_url: `${req.nextUrl.origin}/payments/cashfree/callback?order_id={order_id}`,
        notify_url: `${req.nextUrl.origin}/api/payments/cashfree/webhook`,
      },
    };

    const response = await Cashfree.PGCreateOrder(orderPayload);
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({ error: error.message || 'Order creation failed' }, { status: 500 });
  }
}
