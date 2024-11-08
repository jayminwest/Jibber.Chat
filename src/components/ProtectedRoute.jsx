import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [subscriptionStatus, setSubscriptionStatus] = useState(null);
  const [checkingSubscription, setCheckingSubscription] = useState(true);

  useEffect(() => {
    const checkSubscription = async () => {
      if (user) {
        try {
          const { data, error } = await supabase
            .from('profiles')
            .select('subscription_status')
            .eq('id', user.id)
            .single();

          if (error) throw error;
          setSubscriptionStatus(data?.subscription_status);
        } catch (error) {
          console.error('Error checking subscription:', error);
        }
      }
      setCheckingSubscription(false);
    };

    checkSubscription();
  }, [user]);

  if (loading || checkingSubscription) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (!subscriptionStatus || subscriptionStatus === 'free') {
    return <Navigate to="/pricing" />;
  }

  return children;
};

export default ProtectedRoute; 