import React, { useEffect } from 'react';
import { SignIn, useAuth, useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { isSignedIn } = useAuth();
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSignedIn && isLoaded && user) {
      // Check for admin role in Clerk publicMetadata
      const role = user.publicMetadata?.role;
      if (role === 'admin') {
        navigate('/admin-dashboard', { replace: true });
      } else {
        navigate('/user-dashboard', { replace: true });
      }
    }
  }, [isSignedIn, isLoaded, user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
      <div className="max-w-md w-full card p-8">
        <SignIn routing="path" path="/login" afterSignInUrl="/user-dashboard" />
      </div>
    </div>
  );
};

export default Login;