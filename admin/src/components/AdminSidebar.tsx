import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  UtensilsCrossed,
  Layers,
  Flame,
  Image as ImageIcon,
  Star,
  ShoppingBag,
  CalendarCheck,
  Users,
  Mail,
  Settings,
  User,
  LogOut,
  ChevronLeft,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface AdminSidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  isCollapsed,
  onToggleCollapse,
  isMobileOpen,
  onCloseMobile,
}) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const navItems = [
    { label: 'Dashboard', path: '/', icon: LayoutDashboard, exact: true },
    { label: 'Menu Items', path: '/menu', icon: UtensilsCrossed },
    { label: 'Categories', path: '/categories', icon: Layers },
    { label: 'Platters', path: '/platters', icon: Flame },
    { label: 'Gallery', path: '/gallery', icon: ImageIcon },
    { label: 'Reviews', path: '/reviews', icon: Star },
    { label: 'Orders', path: '/orders', icon: ShoppingBag },
    { label: 'Reservations', path: '/reservations', icon: CalendarCheck },
    { label: 'Customers', path: '/customers', icon: Users },
    { label: 'Inbox Messages', path: '/messages', icon: Mail },
    { label: 'Settings', path: '/settings', icon: Settings },
    { label: 'My Profile', path: '/profile', icon: User },
  ];

  const sidebarContent = (
    <div className="h-full flex flex-col justify-between bg-[#14151B] border-r border-white/10 text-gray-300">
      {/* Top Section: Brand & Navigation */}
      <div>
        {/* Brand Header */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center space-x-3 overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#D4AF37] to-[#F3E5AB] text-black font-bold flex items-center justify-center text-lg flex-shrink-0 shadow-lg shadow-[#D4AF37]/20">
              YM
            </div>
            {(!isCollapsed || isMobileOpen) && (
              <div className="truncate">
                <h1 className="text-sm font-bold text-white tracking-wide truncate">Yaseen Malak</h1>
                <p className="text-[10px] text-[#D4AF37] tracking-wider uppercase font-semibold">CMS Portal</p>
              </div>
            )}
          </div>
          <button
            onClick={onToggleCollapse}
            className="hidden md:flex p-1.5 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
          >
            <ChevronLeft className={`w-5 h-5 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="p-3 space-y-1.5 overflow-y-auto max-h-[calc(100vh-160px)]">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.exact}
              onClick={onCloseMobile}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-[#D4AF37]/15 text-[#F3E5AB] border border-[#D4AF37]/30 shadow-inner'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`
              }
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {(!isCollapsed || isMobileOpen) && <span className="truncate">{item.label}</span>}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Bottom Section: Admin Profile & Logout */}
      <div className="p-3 border-t border-white/10 space-y-2">
        {(!isCollapsed || isMobileOpen) && (
          <div className="flex items-center space-x-3 px-3 py-2 bg-white/5 rounded-xl">
            <div className="w-8 h-8 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] flex items-center justify-center font-bold text-xs">
              {user?.name ? user.name[0].toUpperCase() : 'A'}
            </div>
            <div className="truncate flex-1">
              <p className="text-xs font-semibold text-white truncate">{user?.name || 'Admin'}</p>
              <p className="text-[10px] text-gray-400 truncate">{user?.email || 'admin@yaseenmalak.com'}</p>
            </div>
          </div>
        )}

        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {(!isCollapsed || isMobileOpen) && <span>Logout</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:block fixed top-0 left-0 h-screen z-30 transition-all duration-300 ${
          isCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Backdrop */}
      {isMobileOpen && (
        <div
          onClick={onCloseMobile}
          className="md:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-40 animate-fade-in"
        />
      )}

      {/* Mobile Drawer */}
      <aside
        className={`md:hidden fixed top-0 left-0 h-screen w-64 z-50 transition-transform duration-300 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {sidebarContent}
      </aside>
    </>
  );
};
