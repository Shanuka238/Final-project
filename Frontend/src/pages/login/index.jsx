import React, { useEffect } from 'react';
import { SignIn, useAuth, useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { isSignedIn } = useAuth();
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoaded) return; // Wait until user is loaded
    if (isSignedIn && user) {
      // Check for role in Clerk publicMetadata
      const role = user.publicMetadata?.role;
      if (role === 'admin') {
        navigate('/admin-dashboard', { replace: true });
      } else if (role === 'staff') {
        navigate('/staff-dashboard', { replace: true });
      } else {
        navigate('/user-dashboard', { replace: true });
      }
    }
  }, [isSignedIn, isLoaded, user, navigate]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
        <div className="max-w-md w-full card p-8 text-center text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
      <div className="max-w-md w-full card p-8">
        <SignIn routing="path" path="/login" />
      </div>
    </div>
  );
};

export default Login;