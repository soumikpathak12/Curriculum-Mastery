import { useState } from 'react';

// Add Cashfree type to window
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Cashfree?: any;
  }
}

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
      if (data.payment_session_id) {
        // Load Cashfree's checkout.js script if not already loaded
        if (!window.Cashfree) {
          const script = document.createElement('script');
          script.src = 'https://sdk.cashfree.com/js/v3/cashfree.js';
          script.async = true;
          document.body.appendChild(script);
          script.onload = () => launchCheckout(data.payment_session_id);
        } else {
          launchCheckout(data.payment_session_id);
        }
      } else {
        alert('Failed to create payment order.');
      }
    } catch {
      alert('Payment error.');
    } finally {
      setLoading(false);
    }
  };

  function launchCheckout(paymentSessionId: string) {
    if (window.Cashfree) {
      const cashfree = new window.Cashfree(paymentSessionId);
      cashfree.redirect();
    }
  }

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
