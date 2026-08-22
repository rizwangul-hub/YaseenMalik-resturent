import React, { useState, useEffect } from 'react';
import { Phone, MapPin, Menu as MenuIcon, X, Calendar, Clock, ShoppingBag, Search } from 'lucide-react';
import { RESTAURANT_INFO, yasenLogoImg } from '../data/restaurantData';

interface NavbarProps {
  onOpenReservation: () => void;
  onOpenOrderDrawer: () => void;
  onOpenTracking?: () => void;
  cartCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenReservation,
  onOpenOrderDrawer,
  onOpenTracking,
  cartCount,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Specialties', href: '#specialties' },
    { name: 'Platters', href: '#platters' },
    { name: 'Menu', href: '#menu' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header
        id="main-navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0E0E12]/95 backdrop-blur-md border-b border-[#D4AF37]/20 shadow-2xl py-3.5'
            : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo with Yaseen Malak Picture */}
            <a
              href="#hero"
              id="nav-logo-link"
              className="flex items-center gap-3 group focus:outline-none"
            >
              <div className="w-11 h-11 rounded-full border-2 border-[#D4AF37] overflow-hidden shadow-lg group-hover:scale-105 transition-transform flex-shrink-0 bg-[#16161D]">
                <img
                  src={yasenLogoImg}
                  alt="Yaseen Malak"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-heading text-lg sm:text-xl font-bold tracking-tight text-white group-hover:text-[#F3E5AB] transition-colors">
                  Yaseen Malak
                </span>
                <span className="text-[10px] tracking-[0.2em] uppercase text-[#D4AF37] font-medium">
                  Restaurant • Peshawar
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-7" aria-label="Main Navigation">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  id={`nav-link-${link.name.toLowerCase()}`}
                  className="text-sm font-medium text-[#D1C9BE] hover:text-[#E5C058] transition-colors duration-200 tracking-wide relative group py-1"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#D4AF37] transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </nav>

            {/* Right CTAs */}
            <div className="hidden sm:flex items-center space-x-3">
              {/* Order Tracking Button */}
              {onOpenTracking && (
                <button
                  type="button"
                  onClick={onOpenTracking}
                  className="px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-gray-300 hover:text-white transition-all flex items-center gap-1.5"
                >
                  <Search className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Track Order</span>
                </button>
              )}

              {/* Order / Platter Estimator Button */}
              <button
                type="button"
                id="navbar-order-drawer-btn"
                onClick={onOpenOrderDrawer}
                className="relative px-3.5 py-2 rounded-lg bg-[#181820] hover:bg-[#22222D] border border-[#D4AF37]/30 text-xs font-semibold text-[#ECE7DF] flex items-center gap-2 transition-all hover:border-[#D4AF37]"
                aria-label="View platter order inquiry"
              >
                <ShoppingBag className="w-4 h-4 text-[#E5C058]" />
                <span>Cart / Checkout</span>
                {cartCount > 0 && (
                  <span className="w-5 h-5 rounded-full bg-[#D4AF37] text-black text-[11px] font-bold flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Direct Call Button */}
              <a
                href={`tel:${RESTAURANT_INFO.phoneRaw}`}
                id="nav-call-btn"
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#D4AF37] via-[#E5C058] to-[#B8860B] text-black text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md hover:brightness-110 active:scale-95 transition-all"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Now</span>
              </a>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                type="button"
                id="mobile-cart-toggle-btn"
                onClick={onOpenOrderDrawer}
                className="p-2 rounded-lg bg-[#181820] border border-[#D4AF37]/30 text-[#ECE7DF] relative"
                aria-label="Order Cart"
              >
                <ShoppingBag className="w-5 h-5 text-[#E5C058]" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#D4AF37] text-black text-[10px] font-bold flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              <button
                type="button"
                id="mobile-menu-toggle-btn"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg bg-[#181820] border border-[#D4AF37]/30 text-[#D1C9BE] hover:text-white focus:outline-none"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6 text-[#E5C058]" /> : <MenuIcon className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu-drawer"
          className="fixed inset-0 z-40 lg:hidden bg-black/80 backdrop-blur-md transition-opacity duration-300"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="fixed inset-y-0 right-0 max-w-xs w-full bg-[#101015] border-l border-[#D4AF37]/20 p-6 flex flex-col justify-between shadow-2xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full border border-[#D4AF37] overflow-hidden">
                    <img src={yasenLogoImg} alt="Yaseen Malak" className="w-full h-full object-cover" />
                  </div>
                  <span className="font-heading font-bold text-white text-base">Yaseen Malak</span>
                </div>
                <button
                  type="button"
                  id="mobile-menu-close-btn"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-md text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-1">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2.5 rounded-lg text-base font-medium text-[#D1C9BE] hover:text-white hover:bg-[#1C1C24] transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
                {onOpenTracking && (
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenTracking();
                    }}
                    className="w-full text-left px-3 py-2.5 rounded-lg text-base font-medium text-[#D4AF37] hover:bg-[#1C1C24] transition-colors"
                  >
                    🔍 Track Order
                  </button>
                )}
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 space-y-3">
              <div className="flex items-center gap-2 text-xs text-[#A89E90]">
                <Clock className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>11:00 AM – 11:00 PM (Daily)</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#A89E90]">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span className="truncate">{RESTAURANT_INFO.shortAddress}</span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <a
                  href={`tel:${RESTAURANT_INFO.phoneRaw}`}
                  className="w-full py-2.5 px-3 rounded-lg bg-[#D4AF37] text-black text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call</span>
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenReservation();
                  }}
                  className="w-full py-2.5 px-3 rounded-lg bg-[#1E1E28] border border-[#D4AF37]/40 text-[#E5C058] text-xs font-semibold flex items-center justify-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book Table</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
