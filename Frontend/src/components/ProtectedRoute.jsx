import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from 'contexts/AuthContext';

export default function ProtectedRoute({ children, role }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
    if (user.role === 'admin') return <Navigate to="/admin-dashboard" replace />;
    if (user.role === 'staff') return <Navigate to="/staff-dashboard" replace />;
    return <Navigate to="/user-dashboard" replace />;
  }

  return children;
}
