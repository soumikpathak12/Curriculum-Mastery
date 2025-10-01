import { NextRequest, NextResponse } from 'next/server';
// import { Cashfree } from 'cashfree-pg';

// TODO: Configure Cashfree when environment variables are set
// const clientId = process.env.CASHFREE_CLIENT_ID || 'YOUR_CLIENT_ID';
// const clientSecret = process.env.CASHFREE_CLIENT_SECRET || 'YOUR_CLIENT_SECRET';
// const env = process.env.CASHFREE_ENV || 'TEST'; // 'TEST' or 'PROD'

// Cashfree.XClientId = clientId;
// Cashfree.XClientSecret = clientSecret;
// Cashfree.XEnvironment = env;

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

    // TODO: Uncomment when Cashfree is properly configured
    // const response = await Cashfree.PGCreateOrder(orderPayload);
    // return NextResponse.json(response);
    
    // For now, return mock response
    return NextResponse.json({ 
      message: 'Cashfree integration not configured yet',
      orderPayload 
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Order creation failed';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
