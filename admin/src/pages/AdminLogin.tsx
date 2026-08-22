import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, Lock, Mail, ShieldAlert } from 'lucide-react';

export const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError('Please fill in both email and password.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await login(email, password);
      if (res && res.success) {
        navigate('/');
      } else {
        setError(res?.message || 'Invalid email or password credentials.');
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || err?.message || 'Failed to authenticate with server.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0B0E] text-white flex items-center justify-center p-4 selection:bg-[#D4AF37]/30 selection:text-[#F3E5AB]">
      {/* Glow Effects */}
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full bg-[#14151B] border border-white/10 rounded-3xl p-8 shadow-2xl relative z-10 space-y-6">
        {/* Header Branding */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#D4AF37] to-[#F3E5AB] text-black font-extrabold flex items-center justify-center text-2xl mx-auto shadow-lg shadow-[#D4AF37]/20">
            YM
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Yaseen Malak CMS</h1>
          <p className="text-xs text-gray-400">Sign in to manage restaurant orders, menu & settings</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-4 flex items-start space-x-3 text-red-400 text-sm animate-fade-in">
            <ShieldAlert className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@yaseenmalakrestaurant.com"
                className="w-full bg-[#0D0E12] border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider">
              Password
            </label>
            <div className="relative">
              <Lock className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-[#0D0E12] border border-white/10 rounded-xl pl-11 pr-11 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center space-x-2 text-xs text-gray-400 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-white/10 bg-[#0D0E12] text-[#D4AF37] focus:ring-0"
              />
              <span>Remember session</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 bg-gradient-to-r from-[#D4AF37] to-[#B59226] hover:from-[#E5C158] hover:to-[#C6A337] text-black font-bold text-sm rounded-xl shadow-lg shadow-[#D4AF37]/20 transition-all duration-200 disabled:opacity-50"
          >
            {isSubmitting ? 'Authenticating...' : 'Sign In to Dashboard'}
          </button>
        </form>

        <div className="text-center pt-2 text-xs text-gray-500">
          Yaseen Malak Restaurant • Peshawar Ring Road
        </div>
      </div>
    </div>
  );
};
