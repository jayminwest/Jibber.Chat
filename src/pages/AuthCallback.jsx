import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../config/supabase';

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Get the current session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) throw sessionError;

        if (session) {
          // Check if profile exists
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

          if (profileError && profileError.code !== 'PGRST116') {
            console.error('Profile fetch error:', profileError);
          }

          // If no profile exists, create one
          if (!profile) {
            const { error: insertError } = await supabase
              .from('profiles')
              .insert([
                {
                  id: session.user.id,
                  full_name: session.user.user_metadata?.full_name || '',
                  avatar_url: session.user.user_metadata?.avatar_url || '',
                  subscription_status: 'free',
                  created_at: new Date().toISOString(),
                }
              ]);

            if (insertError) {
              console.error('Profile creation error:', insertError);
            }
          }

          // Redirect to profile page
          navigate('/profile');
          return;
        }

        // If we get here, something went wrong
        throw new Error('No session found');
        
      } catch (error) {
        console.error('Error during auth callback:', error);
        // Wait a bit before redirecting to ensure the error is logged
        setTimeout(() => {
          navigate('/login');
        }, 1000);
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      <p className="mt-4 text-gray-600">Completing sign in...</p>
    </div>
  );
};

export default AuthCallback; 