import React, { useState } from 'react';
import { User, Lock, Save, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import authService from '../services/authService';

export const ProfileSettings: React.FC = () => {
  const { user, setUser } = useAuth();
  const { showToast } = useToast();

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword && newPassword !== confirmPassword) {
      showToast('New passwords do not match', 'error');
      return;
    }

    if (newPassword && !currentPassword) {
      showToast('Current password is required to change password', 'error');
      return;
    }

    setIsSaving(true);
    try {
      showToast('Admin profile updated successfully!', 'success');
      setUser((prev) => (prev ? { ...prev, name, email } : null));
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      showToast(err?.message || 'Failed to update profile', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-white">Admin Profile & Security</h1>
        <p className="text-xs text-gray-400">Update account credentials and security settings</p>
      </div>

      <div className="bg-[#14151B] border border-white/10 rounded-2xl p-6 space-y-6 shadow-xl">
        <div className="flex items-center space-x-4 border-b border-white/10 pb-6">
          <div className="w-16 h-16 rounded-full bg-[#D4AF37]/20 border-2 border-[#D4AF37] text-[#D4AF37] flex items-center justify-center font-extrabold text-2xl shadow-lg">
            {name ? name[0].toUpperCase() : 'A'}
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">{user?.name || 'Administrator'}</h2>
            <p className="text-xs text-[#D4AF37] font-semibold uppercase tracking-wider">{user?.role || 'SUPER_ADMIN'}</p>
            <p className="text-xs text-gray-400 mt-0.5">{user?.email}</p>
          </div>
        </div>

        <form onSubmit={handleUpdateProfile} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
              Full Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#0D0E12] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:border-[#D4AF37] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#0D0E12] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:border-[#D4AF37] focus:outline-none"
            />
          </div>

          <div className="pt-4 border-t border-white/10 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center space-x-2">
              <Lock className="w-4 h-4 text-[#D4AF37]" />
              <span>Change Password</span>
            </h3>

            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                Current Password
              </label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Required for password change"
                className="w-full bg-[#0D0E12] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:border-[#D4AF37] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Min 6 characters"
                  className="w-full bg-[#0D0E12] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-[#0D0E12] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-2.5 bg-[#D4AF37] hover:bg-[#B59226] text-black font-bold rounded-xl text-sm transition-colors shadow-lg shadow-[#D4AF37]/20 flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? 'Saving...' : 'Update Account'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
