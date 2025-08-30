import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotLoggedIn = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-8">
      <h2 className="text-2xl font-bold mb-4 text-primary">Sign in required</h2>
      <p className="mb-6 text-text-secondary max-w-md">
        You must be signed in to contact us. Please sign in to continue, or return to the home page.
      </p>
      <div className="flex gap-4">
        <button
          className="bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors duration-200"
          onClick={() => navigate('/login')}
        >
          Sign In
        </button>
        <button
          className="btn-secondary px-6 py-2 rounded-lg font-medium"
          onClick={() => navigate('/')}
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default NotLoggedIn;
