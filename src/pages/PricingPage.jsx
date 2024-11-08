import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../config/supabase';

const PricingPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSubscribe = async (plan) => {
    try {
      // Update the user's subscription status
      const { error } = await supabase
        .from('profiles')
        .update({ 
          subscription_status: plan,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) throw error;

      // In a real app, you would integrate with Stripe here
      // For now, we'll just redirect to the chat page
      navigate('/chat');
    } catch (error) {
      console.error('Error updating subscription:', error);
      alert('Failed to update subscription. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Plan
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Get access to personalized mountain insights and real-time conditions
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-3 lg:gap-x-8">
          {/* Free Plan */}
          <div className="relative bg-white rounded-2xl shadow-sm flex flex-col">
            <div className="p-8 text-center">
              <h3 className="text-xl font-semibold text-gray-900">Basic</h3>
              <p className="mt-4 text-gray-500">Perfect for casual skiers</p>
              <p className="mt-8">
                <span className="text-4xl font-bold text-gray-900">$0</span>
                <span className="text-gray-500">/month</span>
              </p>
              <button
                onClick={() => handleSubscribe('free')}
                className="mt-8 block w-full bg-gray-50 py-3 px-6 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Get Started
              </button>
            </div>
            <div className="flex-1 flex flex-col justify-between p-8 bg-gray-50 rounded-b-2xl">
              <ul className="space-y-4">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Basic mountain conditions
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Limited chat interactions
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Single mountain access
                </li>
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
              <h3 className="text-xl font-semibold text-gray-900">Pro</h3>
              <p className="mt-4 text-gray-500">For the dedicated skier</p>
              <p className="mt-8">
                <span className="text-4xl font-bold text-gray-900">$19</span>
                <span className="text-gray-500">/month</span>
              </p>
              <button
                onClick={() => handleSubscribe('pro')}
                className="mt-8 block w-full bg-blue-600 py-3 px-6 border border-transparent rounded-md text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Subscribe
              </button>
            </div>
            <div className="flex-1 flex flex-col justify-between p-8 bg-gray-50 rounded-b-2xl">
              <ul className="space-y-4">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Real-time conditions
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Unlimited chat interactions
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Multi-mountain access
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Personalized recommendations
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Priority support
                </li>
              </ul>
            </div>
          </div>

          {/* Premium Plan */}
          <div className="relative bg-white rounded-2xl shadow-sm flex flex-col">
            <div className="p-8 text-center">
              <h3 className="text-xl font-semibold text-gray-900">Premium</h3>
              <p className="mt-4 text-gray-500">For professional athletes</p>
              <p className="mt-8">
                <span className="text-4xl font-bold text-gray-900">$39</span>
                <span className="text-gray-500">/month</span>
              </p>
              <button
                onClick={() => handleSubscribe('premium')}
                className="mt-8 block w-full bg-gray-50 py-3 px-6 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Subscribe
              </button>
            </div>
            <div className="flex-1 flex flex-col justify-between p-8 bg-gray-50 rounded-b-2xl">
              <ul className="space-y-4">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Everything in Pro
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Advanced analytics
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Custom alerts
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  API access
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage; 