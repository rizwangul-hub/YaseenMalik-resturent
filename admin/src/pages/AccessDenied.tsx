import React from 'react';
import { Link } from 'react-router-dom';

export const AccessDenied: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0B0B0E] text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="w-20 h-20 bg-red-500/10 border border-red-500/20 text-red-500 rounded-full flex items-center justify-center text-4xl mb-6">
        🚫
      </div>
      <h1 className="text-3xl font-bold mb-2">Access Denied</h1>
      <p className="text-gray-400 max-w-md mb-8">
        You do not have permission to access the Yaseen Malak Restaurant Admin Panel. Please sign in with administrator credentials.
      </p>
      <Link
        to="/admin/login"
        className="px-6 py-3 bg-[#D4AF37] text-black font-semibold rounded-xl hover:bg-[#B59226] transition-colors"
      >
        Go to Admin Login
      </Link>
    </div>
  );
};
