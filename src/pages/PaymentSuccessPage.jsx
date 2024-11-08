import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const PaymentSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyPayment = async () => {
      const sessionId = searchParams.get('session_id');
      
      if (sessionId) {
        try {
          // Verify the payment session using Supabase Edge Function
          const { error } = await supabase.functions.invoke('stripe-verify-session', {
            body: { sessionId }
          });

          if (error) throw error;

          setLoading(false);
          // Redirect to chat after 3 seconds
          setTimeout(() => {
            navigate('/chat');
          }, 3000);
        } catch (error) {
          console.error('Error verifying payment:', error);
          navigate('/');
        }
      } else {
        navigate('/');
      }
    };

    verifyPayment();
  }, [searchParams, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Payment Successful!
        </h2>
        <p className="text-gray-600 mb-8">
          Thank you for subscribing to Jibber.chat. You'll be redirected to the chat page in a moment.
        </p>
        <button
          onClick={() => navigate('/chat')}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Go to Chat Now
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccessPage; 