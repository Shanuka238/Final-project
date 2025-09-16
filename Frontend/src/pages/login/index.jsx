import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'contexts/AuthContext';
import { useEffect } from 'react';
import { motion } from 'framer-motion';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    if (token) {
      login(token);
      navigate('/user-dashboard');
    }
  }, [login, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');
      login(data.token);
      const userData = JSON.parse(atob(data.token.split('.')[1]));
      if (userData.role === 'admin') {
        navigate('/admin-dashboard');
      } else if (userData.role === 'staff') {
        navigate('/staff-dashboard');
      } else {
        navigate('/user-dashboard');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F8F5FF] via-[#F4F1FF] to-[#FFF7ED] px-4 py-12">
      <motion.form
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, type: 'spring' }}
        className="max-w-md w-full card p-8 space-y-6 shadow-xl border-2 border-primary-100 bg-white/90 backdrop-blur-md"
        onSubmit={handleSubmit}
      >
        <motion.h2
          className="font-heading text-3xl font-bold mb-4 text-primary"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          Login
        </motion.h2>
        {error && <motion.div className="text-red-500 text-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{error}</motion.div>}
        <motion.input
          className="input w-full focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition-all duration-200"
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          whileFocus={{ scale: 1.03, boxShadow: '0 0 0 2px #B491E5' }}
        />
        <motion.input
          className="input w-full focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition-all duration-200"
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          whileFocus={{ scale: 1.03, boxShadow: '0 0 0 2px #B491E5' }}
        />
        <motion.button
          className="btn-primary w-full shadow-md hover:scale-105 transition-transform duration-200"
          type="submit"
          disabled={loading}
          whileTap={{ scale: 0.97 }}
        >
          {loading ? 'Logging in...' : 'Login'}
        </motion.button>
        <button
          type="button"
          className="w-full flex items-center justify-center gap-2 py-2 px-4 border border-gray-300 rounded-lg bg-white text-gray-700 font-medium hover:bg-gray-50 transition mt-4"
          onClick={() => window.location.href = 'http://localhost:5000/api/auth/google'}
        >
          <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google" className="w-5 h-5" />
          Continue with Google
        </button>
        <motion.div className="text-sm text-center mt-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          Don't have an account? <a href="/register" className="text-primary underline">Register</a>
        </motion.div>
      </motion.form>
    </div>
  );
};

export default Login;