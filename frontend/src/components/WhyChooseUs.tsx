import React from 'react';
import { Flame, Beef, UtensilsCrossed, Users, Sparkles, ShieldCheck } from 'lucide-react';
import { WHY_CHOOSE_US } from '../data/restaurantData';

export const WhyChooseUs: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Flame':
        return <Flame className="w-6 h-6 text-[#E5A93C]" />;
      case 'Beef':
        return <Beef className="w-6 h-6 text-[#E5A93C]" />;
      case 'UtensilsCrossed':
        return <UtensilsCrossed className="w-6 h-6 text-[#E5A93C]" />;
      case 'Users':
        return <Users className="w-6 h-6 text-[#E5A93C]" />;
      default:
        return <Sparkles className="w-6 h-6 text-[#E5A93C]" />;
    }
  };

  return (
    <section id="why-us" className="py-20 sm:py-28 bg-[#0D0D12] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-islamic-pattern opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-80 h-80 bg-[#D4AF37]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181822] border border-[#D4AF37]/30 text-[#E5C058] text-xs font-bold uppercase tracking-[0.2em] mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>The Yaseen Malak Standard</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-heading tracking-tight mb-4">
            Why Dine <span className="text-gold-gradient">With Us?</span>
          </h2>
          <p className="text-sm sm:text-base text-[#BDB5A6] font-normal leading-relaxed">
            Our unwavering dedication to fresh meats, genuine open-fire charcoal techniques, and traditional Pakistani hospitality.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_CHOOSE_US.map((item) => (
            <div
              key={item.id}
              id={item.id}
              className="p-6 rounded-2xl bg-[#14141B] border border-white/10 hover:border-[#D4AF37]/50 shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl group flex flex-col justify-between"
            >
              <div>
                {/* Icon Container */}
                <div className="w-12 h-12 rounded-xl bg-[#1D1D28] border border-[#D4AF37]/30 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:border-[#D4AF37] transition-all">
                  {getIcon(item.icon)}
                </div>

                {/* Title */}
                <h3 className="font-heading text-lg font-bold text-white mb-1 group-hover:text-[#F3E5AB] transition-colors">
                  {item.title}
                </h3>

                {/* Urdu subtitle */}
                <div className="font-urdu text-xs text-[#D4AF37] mb-3 font-normal">
                  {item.urduTitle}
                </div>

                {/* Description */}
                <p className="text-xs text-[#A89E90] leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Bottom decorative bar */}
              <div className="mt-6 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-[#C2B8A3]">
                <span>Peshawar Heritage</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] group-hover:scale-125 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
