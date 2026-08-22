import React from 'react';
import { Phone, Utensils, MapPin, ArrowRight } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import heroBbqPlatterImg from '../assets/images/hero_bbq_platter_1787336142698.jpg';

export const CtaSection: React.FC = () => {
  return (
    <section className="relative py-20 sm:py-24 overflow-hidden bg-[#0A0A0D]">
      {/* Background Image with Dark Cinematic Gradient */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroBbqPlatterImg}
          alt="Pakistani Feast Platter Background"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center brightness-[0.35]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-black/95" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#181824]/90 border border-[#D4AF37]/40 text-[#F3E5AB] text-xs font-bold uppercase tracking-[0.2em] mb-6 shadow-xl">
          <Utensils className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Join Us in Peshawar</span>
        </div>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white font-heading tracking-tight mb-5 leading-tight">
          Ready for a <span className="text-gold-gradient">Delicious Experience?</span>
        </h2>

        <p className="text-base sm:text-xl text-[#D6CEBF] font-normal max-w-2xl mx-auto mb-10 leading-relaxed">
          Bring your family and friends and enjoy authentic flavors at Yaseen Malak Restaurant. Fresh BBQ, sizzling Sajji, and royal platters await.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="#menu"
            id="cta-explore-menu-btn"
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#E5C058] to-[#B8860B] hover:brightness-110 text-black font-bold text-sm uppercase tracking-wider shadow-2xl transition-all flex items-center gap-2"
          >
            <span>Explore Menu</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href={`tel:${RESTAURANT_INFO.phoneRaw}`}
            id="cta-call-btn"
            className="px-8 py-4 rounded-xl bg-[#181822]/90 hover:bg-[#222230] border border-[#D4AF37]/50 text-white font-bold text-sm uppercase tracking-wider shadow-2xl transition-all flex items-center gap-2 backdrop-blur-sm"
          >
            <Phone className="w-4 h-4 text-[#D4AF37]" />
            <span>Call Now: {RESTAURANT_INFO.phone}</span>
          </a>
        </div>
      </div>
    </section>
  );
};
