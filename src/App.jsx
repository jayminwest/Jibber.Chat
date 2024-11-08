import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';
import AuthCallback from './pages/AuthCallback';
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';
import ProfilePage from './pages/ProfilePage';
import ProtectedRoute from './components/ProtectedRoute';
import PricingPage from './pages/PricingPage';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/login" element={<SignInPage />} />
              <Route path="/auth/callback" element={<AuthCallback />} />
              <Route 
                path="/chat" 
                element={
                  <ProtectedRoute>
                    <ChatPage />
                  </ProtectedRoute>
                } 
              />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/pricing" element={<PricingPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;
