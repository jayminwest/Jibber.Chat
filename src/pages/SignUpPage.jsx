import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const SignUpPage = () => {
  const navigate = useNavigate();
  const { signInWithGoogle } = useAuth();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Google sign in error:', error);
      alert('Sign in failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-50 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl">
        {/* Logo and Header */}
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-3 rounded-2xl shadow-lg">
              <span className="text-4xl">⛷️</span>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
            Join Jibber.chat
          </h2>
          <p className="mt-3 text-gray-500">
            Get real-time mountain conditions and personalized recommendations
          </p>
        </div>

        {/* Sign In Button */}
        <div className="space-y-6">
          <button
            onClick={handleGoogleSignIn}
            type="button"
            className="w-full flex items-center justify-center gap-3 px-4 py-3.5 border-2 border-gray-200 rounded-xl shadow-sm bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform transition-all duration-200 hover:scale-[1.02]"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            <span className="text-gray-700 font-medium">Continue with Google</span>
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">
                Already have an account?
              </span>
            </div>
          </div>

          <Link
            to="/login"
            className="w-full flex justify-center px-4 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium shadow-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform transition-all duration-200 hover:scale-[1.02]"
          >
            Sign in to your account
          </Link>
        </div>

        {/* Terms and Privacy */}
        <div className="mt-6">
          <p className="text-center text-sm text-gray-500">
            By signing up, you agree to our{' '}
            <Link to="/terms" className="text-blue-600 hover:text-blue-700 font-medium hover:underline">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link to="/privacy" className="text-blue-600 hover:text-blue-700 font-medium hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
