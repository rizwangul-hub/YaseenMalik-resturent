import React from 'react';
import { Sparkles, Eye, Plus, Flame, Clock } from 'lucide-react';
import { SPECIALTIES_LIST } from '../data/restaurantData';
import { MenuItem } from '../types';

interface SpecialtiesSectionProps {
  onSelectDish: (dish: MenuItem) => void;
  onAddToCart: (dish: MenuItem) => void;
}

export const SpecialtiesSection: React.FC<SpecialtiesSectionProps> = ({
  onSelectDish,
  onAddToCart,
}) => {
  return (
    <section id="specialties" className="py-20 sm:py-28 bg-[#0B0B0E] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181822] border border-[#D4AF37]/30 text-[#E5C058] text-xs font-bold uppercase tracking-[0.2em] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Chef's Masterpieces</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-heading tracking-tight mb-4">
            Our <span className="text-gold-gradient">Specialties</span>
          </h2>
          <p className="text-sm sm:text-base text-[#BDB5A6] font-normal leading-relaxed">
            Handcrafted with age-old charcoal grilling techniques, secret marinades, and fresh local ingredients from the heart of Peshawar.
          </p>
        </div>

        {/* Food Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SPECIALTIES_LIST.map((dish) => (
            <div
              key={dish.id}
              id={`specialty-card-${dish.id}`}
              className="group rounded-2xl bg-[#131318] border border-white/10 hover:border-[#D4AF37]/50 shadow-xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-[#D4AF37]/10"
            >
              {/* Image Container with Zoom Effect */}
              <div className="relative h-48 sm:h-52 overflow-hidden bg-[#1A1A22]">
                <img
                  src={dish.imageUrl}
                  alt={dish.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#131318] via-transparent to-black/30" />

                {/* Badge Tag */}
                {dish.isBestSeller && (
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#8B1E22] text-[#FFF4D0] text-[10px] font-bold uppercase tracking-wider shadow-md">
                    Top Pick
                  </div>
                )}

                {/* Price Pill */}
                <div className="absolute bottom-3 right-3 px-3 py-1 rounded-lg bg-[#0E0E14]/90 border border-[#D4AF37]/40 text-[#E5C058] font-bold text-xs shadow-lg backdrop-blur-sm">
                  {dish.priceFormatted}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-baseline justify-between gap-2 mb-1">
                    <h3 className="font-heading text-lg font-bold text-white group-hover:text-[#F3E5AB] transition-colors line-clamp-1">
                      {dish.name}
                    </h3>
                  </div>

                  {dish.urduName && (
                    <div className="font-urdu text-xs text-[#D4AF37] mb-2 font-normal">
                      {dish.urduName}
                    </div>
                  )}

                  <p className="text-xs text-[#A89E90] leading-relaxed line-clamp-2 mb-4">
                    {dish.description}
                  </p>
                </div>

                {/* Card Footer Actions */}
                <div className="pt-3 border-t border-white/5 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => onSelectDish(dish)}
                    className="flex-1 py-2 px-3 rounded-lg bg-[#1B1B24] hover:bg-[#252532] text-xs font-semibold text-[#D6CEBF] hover:text-white transition-all flex items-center justify-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>View Details</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onAddToCart(dish)}
                    className="py-2 px-3 rounded-lg bg-[#D4AF37]/15 hover:bg-[#D4AF37] text-[#E5C058] hover:text-black border border-[#D4AF37]/40 text-xs font-bold transition-all flex items-center justify-center gap-1"
                    title="Add to Order Inquiry"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span className="hidden xs:inline">Order</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
