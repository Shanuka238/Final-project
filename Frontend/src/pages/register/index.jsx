import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Register = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
  const res = await fetch('https://party-nest.vercel.app/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      let data;
      try {
        data = await res.json();
      } catch (jsonErr) {
        throw new Error('Server error: Invalid response. Please try again later.');
      }
      if (!res.ok) throw new Error(data.message || 'Registration failed');
      setSuccess('Registration successful! You can now log in.');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    if (token) {
      localStorage.setItem('token', token);
      navigate('/user-dashboard');
    }
  }, [navigate]);

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
          Register
        </motion.h2>
        {error && <motion.div className="text-red-500 text-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{error}</motion.div>}
        {success && <motion.div className="text-green-600 text-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{success}</motion.div>}
        <motion.input
          className="input w-full focus:ring-2 focus:ring-primary-400 focus:border-primary-400 transition-all duration-200"
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
          whileFocus={{ scale: 1.03, boxShadow: '0 0 0 2px #B491E5' }}
        />
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
          whileTap={{ scale: 0.97 }}
        >
          Register
        </motion.button>
        <button
          type="button"
          className="w-full flex items-center justify-center gap-2 py-2 px-4 border border-gray-300 rounded-lg bg-white text-gray-700 font-medium hover:bg-gray-50 transition mt-4"
          onClick={() => window.location.href = 'https://party-nest.vercel.app/api/auth/google'}
        >
          <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google" className="w-5 h-5" />
          Continue with Google
        </button>
        <motion.div className="text-sm text-center mt-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          Already have an account? <a href="/login" className="text-primary underline">Login</a>
        </motion.div>
      </motion.form>
    </div>
  );
};

export default Register;
