import { useState } from 'react';

// TODO: Add Cashfree type to window when integration is ready
// declare global {
//   interface Window {
//     Cashfree?: any;
//   }
// }

export default function CashfreePayButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    // Example order details - replace with real data as needed
    const orderData = {
      orderId: 'ORDER_' + Date.now(),
      orderAmount: 1000, // INR
      customerName: 'Test User',
      customerEmail: 'test@example.com',
      customerPhone: '9999999999',
    };
    try {
      const res = await fetch('/api/payments/cashfree', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });
      const data = await res.json();
      // TODO: Implement Cashfree integration when configured
      console.log('Payment data:', data);
      alert('Cashfree integration not yet configured. Using mock payment flow.');
    } catch {
      alert('Payment error.');
    } finally {
      setLoading(false);
    }
  };

  // TODO: Uncomment when Cashfree integration is ready
  // function launchCheckout(paymentSessionId: string) {
  //   if (window.Cashfree) {
  //     const cashfree = new window.Cashfree(paymentSessionId);
  //     cashfree.redirect();
  //   }
  // }

  return (
    <button
      {...props}
      onClick={handlePayment}
      disabled={loading || props.disabled}
      className={
        (props.className || '') +
        ' px-6 py-3 bg-brand-primary text-white rounded-lg font-semibold hover:bg-brand-secondary transition-colors disabled:opacity-50 mt-6'
      }
    >
      {loading ? 'Processing...' : 'Pay with Cashfree'}
    </button>
  );
}
