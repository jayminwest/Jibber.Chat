import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../config/supabase';

const PLANS = {
  starter: {
    name: 'Starter',
    price: 10,
    description: 'For casual skiers',
    features: [
      'Basic conditions access',
      'Limited chat interactions',
      'Single mountain access'
    ]
  },
  pro: {
    name: 'Pro',
    price: 20,
    description: 'For the dedicated skier',
    features: [
      'Real-time conditions',
      'Unlimited chat interactions',
      'Multi-mountain access',
      'Personalized recommendations',
      'Priority support'
    ]
  }
};

const PricingSection = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSubscribe = async (plan) => {
    try {
      if (!user) {
        navigate('/login');
        return;
      }

      console.log('Creating checkout session for:', {
        plan,
        userId: user.id,
        email: user.email,
        returnUrl: window.location.origin
      });

      const { data, error } = await supabase.functions.invoke('stripe-create-checkout', {
        body: {
          plan,
          userId: user.id,
          email: user.email,
          returnUrl: `${window.location.origin}/payment/success`
        }
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw error;
      }

      if (!data?.url) {
        throw new Error('No checkout URL received');
      }

      console.log('Redirecting to:', data.url);
      window.location.href = data.url;
    } catch (error) {
      console.error('Error initiating checkout:', error);
      alert(`Failed to start checkout process: ${error.message}`);
    }
  };

  return (
    <section className="bg-white py-24" id="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Plan
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Get access to personalized mountain insights and real-time conditions
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:gap-x-8 max-w-4xl mx-auto">
          {/* Starter Plan */}
          <div className="relative bg-white rounded-2xl shadow-sm flex flex-col">
            <div className="p-8 text-center">
              <h3 className="text-xl font-semibold text-gray-900">{PLANS.starter.name}</h3>
              <p className="mt-4 text-gray-500">{PLANS.starter.description}</p>
              <p className="mt-8">
                <span className="text-4xl font-bold text-gray-900">${PLANS.starter.price}</span>
                <span className="text-gray-500">/month</span>
              </p>
              <button
                onClick={() => handleSubscribe('starter')}
                className="mt-8 block w-full bg-gray-50 py-3 px-6 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
              >
                Get Started
              </button>
            </div>
            <div className="flex-1 flex flex-col justify-between p-8 bg-gray-50 rounded-b-2xl">
              <ul className="space-y-4">
                {PLANS.starter.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Pro Plan */}
          <div className="relative bg-white rounded-2xl shadow-sm flex flex-col border-2 border-blue-600">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </span>
            </div>
            <div className="p-8 text-center">
              <h3 className="text-xl font-semibold text-gray-900">{PLANS.pro.name}</h3>
              <p className="mt-4 text-gray-500">{PLANS.pro.description}</p>
              <p className="mt-8">
                <span className="text-4xl font-bold text-gray-900">${PLANS.pro.price}</span>
                <span className="text-gray-500">/month</span>
              </p>
              <button
                onClick={() => handleSubscribe('pro')}
                className="mt-8 block w-full bg-blue-600 py-3 px-6 border border-transparent rounded-md text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
              >
                Subscribe
              </button>
            </div>
            <div className="flex-1 flex flex-col justify-between p-8 bg-gray-50 rounded-b-2xl">
              <ul className="space-y-4">
                {PLANS.pro.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
