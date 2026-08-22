import React from 'react';
import { MapPin, Phone, Clock, ArrowUp, Heart } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About Us', href: '#about' },
    { name: 'Specialties', href: '#specialties' },
    { name: 'Signature Platters', href: '#platters' },
    { name: 'Full Menu', href: '#menu' },
    { name: 'Food Gallery', href: '#gallery' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Location & Contact', href: '#contact' },
  ];

  return (
    <footer id="main-footer" className="bg-[#08080A] border-t border-[#D4AF37]/20 pt-16 pb-12 text-[#B8AF9E] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand Col */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-[#D4AF37] bg-[#14141B] flex items-center justify-center">
                <span className="font-heading text-lg font-bold text-[#E5C058]">YM</span>
              </div>
              <div>
                <span className="font-heading text-xl font-bold text-white block">
                  {RESTAURANT_INFO.name}
                </span>
                <span className="text-[10px] tracking-[0.2em] uppercase text-[#D4AF37] font-semibold">
                  {RESTAURANT_INFO.badge}
                </span>
              </div>
            </div>

            <p className="font-urdu text-sm text-[#D4AF37]">
              {RESTAURANT_INFO.urduName}
            </p>

            <p className="text-xs text-[#A89E90] leading-relaxed">
              Peshawar’s premier destination for authentic Pakistani BBQ, slow-roasted Balochi Sajji with rice, and colossal family sharing platters.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={RESTAURANT_INFO.social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-[#14141B] border border-white/10 hover:border-[#D4AF37] flex items-center justify-center text-xs font-bold text-white transition-colors"
                aria-label="TikTok"
              >
                Tk
              </a>
              <a
                href={RESTAURANT_INFO.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-[#14141B] border border-white/10 hover:border-[#D4AF37] flex items-center justify-center text-xs font-bold text-white transition-colors"
                aria-label="Facebook"
              >
                fb
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-4">
            <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-white mb-4">
              Quick Links
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {quickLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="hover:text-[#E5C058] transition-colors py-1 block"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Contact & Hours */}
          <div className="lg:col-span-4 space-y-3 text-xs">
            <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-white mb-4">
              Contact & Timings
            </h4>

            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
              <span>{RESTAURANT_INFO.address}</span>
            </div>

            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <a
                href={`tel:${RESTAURANT_INFO.phoneRaw}`}
                className="text-[#E5C058] hover:underline font-bold"
              >
                {RESTAURANT_INFO.phone}
              </a>
            </div>

            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>{RESTAURANT_INFO.hours} • 7 Days a Week</span>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div>
            © 2026 {RESTAURANT_INFO.name}. All Rights Reserved.
          </div>

          <div className="flex items-center gap-4">
            <span>Crafted for Authentic Peshawar Dining</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-[#14141B] hover:bg-[#1E1E28] text-[#D4AF37] border border-white/10 hover:border-[#D4AF37] transition-all"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
