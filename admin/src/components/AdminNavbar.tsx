import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Globe, Bell, Mail } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

interface AdminNavbarProps {
  onOpenMobileSidebar: () => void;
}

export const AdminNavbar: React.FC<AdminNavbarProps> = ({ onOpenMobileSidebar }) => {
  const { user } = useAuth();
  const [unreadCount, setUnreadCount] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await api.get('/settings/notifications');
        if (res.data && res.data.success && res.data.data) {
          setStats(res.data.data);
          setUnreadCount(res.data.data.totalUnread || 0);
        }
      } catch (e) {
        // Silent fallback
      }
    };
    fetchNotifications();
    const timer = setInterval(fetchNotifications, 15000); // poll every 15s
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="h-16 bg-[#14151B] border-b border-white/10 px-4 md:px-8 flex items-center justify-between sticky top-0 z-20">
      <div className="flex items-center space-x-4">
        <button
          onClick={onOpenMobileSidebar}
          className="md:hidden p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5"
        >
          <Menu className="w-6 h-6" />
        </button>
        <div className="hidden sm:flex items-center space-x-2 text-xs text-gray-400">
          <span>Yaseen Malak Restaurant</span>
          <span>/</span>
          <span className="text-[#D4AF37] font-medium">Control Panel</span>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {/* View Public Website */}
        <Link
          to="/"
          target="_blank"
          className="flex items-center space-x-2 px-3 py-1.5 rounded-xl text-xs font-medium bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 transition-colors"
        >
          <Globe className="w-4 h-4 text-[#D4AF37]" />
          <span className="hidden sm:inline">Public Website</span>
        </Link>

        {/* Notifications Icon with Badge & Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 relative"
            title="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 min-w-[16px] h-4 px-1 bg-[#D4AF37] text-black font-extrabold text-[10px] rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {showDropdown && stats && (
            <div className="absolute right-0 mt-2 w-64 bg-[#14151B] border border-white/10 rounded-2xl shadow-2xl p-4 space-y-2 z-50 animate-fade-in text-xs">
              <div className="font-bold text-white pb-2 border-b border-white/10 flex justify-between items-center">
                <span>System Notifications</span>
                <span className="text-[#D4AF37] font-extrabold">{unreadCount} Pending</span>
              </div>
              <Link
                to="/admin/orders"
                onClick={() => setShowDropdown(false)}
                className="flex justify-between items-center p-2 rounded-xl hover:bg-white/5 text-gray-300 hover:text-white"
              >
                <span>Pending Orders</span>
                <span className="font-bold text-[#E5C058]">{stats.pendingOrders}</span>
              </Link>
              <Link
                to="/admin/reservations"
                onClick={() => setShowDropdown(false)}
                className="flex justify-between items-center p-2 rounded-xl hover:bg-white/5 text-gray-300 hover:text-white"
              >
                <span>Pending Table Bookings</span>
                <span className="font-bold text-[#E5C058]">{stats.pendingReservations}</span>
              </Link>
              <Link
                to="/admin/reviews"
                onClick={() => setShowDropdown(false)}
                className="flex justify-between items-center p-2 rounded-xl hover:bg-white/5 text-gray-300 hover:text-white"
              >
                <span>Pending Reviews</span>
                <span className="font-bold text-[#E5C058]">{stats.pendingReviews}</span>
              </Link>
              <Link
                to="/admin/messages"
                onClick={() => setShowDropdown(false)}
                className="flex justify-between items-center p-2 rounded-xl hover:bg-white/5 text-gray-300 hover:text-white"
              >
                <span>Unread Contact Messages</span>
                <span className="font-bold text-[#E5C058]">{stats.unreadMessages}</span>
              </Link>
            </div>
          )}
        </div>

        {/* Profile Link */}
        <Link
          to="/admin/profile"
          className="flex items-center space-x-2 p-1 rounded-xl hover:bg-white/5 transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] flex items-center justify-center font-bold text-xs">
            {user?.name ? user.name[0].toUpperCase() : 'A'}
          </div>
        </Link>
      </div>
    </header>
  );
};
