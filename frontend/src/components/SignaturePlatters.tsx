import React, { useState, useEffect } from 'react';
import { Crown, Users, CheckCircle, Phone, MessageSquare, Plus, Sparkles } from 'lucide-react';
import { SIGNATURE_PLATTERS, RESTAURANT_INFO } from '../data/restaurantData';
import { Platter } from '../types';
import platterService from '../services/platterService';

interface SignaturePlattersProps {
  onSelectPlatter: (platter: Platter) => void;
  onAddToCart: (platter: Platter) => void;
}

export const SignaturePlatters: React.FC<SignaturePlattersProps> = ({
  onSelectPlatter,
  onAddToCart,
}) => {
  const [platters, setPlatters] = useState<Platter[]>(SIGNATURE_PLATTERS);

  useEffect(() => {
    const fetchPlattersData = async () => {
      try {
        const res = await platterService.getPlatters();
        if (res && res.length > 0) {
          setPlatters(res);
        }
      } catch (e) {
        console.warn('[SignaturePlatters] Using default platters data');
      }
    };
    fetchPlattersData();
  }, []);

  return (
    <section id="platters" className="py-20 sm:py-28 bg-[#0E0E14] relative overflow-hidden">
      {/* Pattern background */}
      <div className="absolute inset-0 bg-islamic-pattern opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1A1A24] border border-[#D4AF37]/40 text-[#F3E5AB] text-xs font-bold uppercase tracking-[0.2em] mb-3">
            <Crown className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Grand Royal Banquets</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-heading tracking-tight mb-4">
            Signature <span className="text-gold-gradient">Family Platters</span>
          </h2>
          <p className="text-sm sm:text-base text-[#C2BAAC] font-normal leading-relaxed">
            Feast like royalty with our legendary multi-dish platters, crafted specifically for grand family gatherings, corporate celebrations, and festive dinner parties.
          </p>
        </div>

        {/* Platters List Showcase */}
        <div className="space-y-12">
          {platters.map((platter, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={platter.id || idx}
                id={`platter-card-${platter.id}`}
                className="rounded-3xl bg-[#14141B] border border-white/10 hover:border-[#D4AF37]/50 shadow-2xl overflow-hidden transition-all duration-300 group"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
                  {/* Image Column */}
                  <div
                    className={`lg:col-span-5 relative min-h-[320px] lg:min-h-[440px] overflow-hidden ${
                      isEven ? 'lg:order-1' : 'lg:order-2'
                    }`}
                  >
                    <img
                      src={platter.imageUrl}
                      alt={platter.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

                    {/* Badge */}
                    {platter.badge && (
                      <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                        <span className="px-3 py-1 rounded-md bg-[#8B1E22] text-[#FFF4D0] text-xs font-extrabold uppercase tracking-wider shadow-lg">
                          {platter.badge}
                        </span>
                      </div>
                    )}

                    {/* Floating Serves Chip */}
                    <div className="absolute bottom-4 left-4 px-3.5 py-1.5 rounded-xl bg-black/80 border border-[#D4AF37]/40 backdrop-blur-md flex items-center gap-2 text-xs font-semibold text-[#E5C058]">
                      <Users className="w-4 h-4 text-[#D4AF37]" />
                      <span>Serves {platter.serves || 'Family'}</span>
                    </div>
                  </div>

                  {/* Content Column */}
                  <div
                    className={`lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between ${
                      isEven ? 'lg:order-2' : 'lg:order-1'
                    }`}
                  >
                    <div>
                      {/* Title & Price Header */}
                      <div className="flex flex-wrap items-baseline justify-between gap-4 pb-4 border-b border-white/10 mb-5">
                        <div>
                          <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-heading tracking-tight mb-1">
                            {platter.name}
                          </h3>
                          {platter.urduName && (
                            <div className="font-urdu text-base text-[#D4AF37]">
                              {platter.urduName}
                            </div>
                          )}
                        </div>

                        <div className="text-right">
                          <div className="text-2xl sm:text-3xl font-extrabold text-[#E5C058] font-heading">
                            {platter.priceFormatted || `Rs. ${platter.price.toLocaleString('en-US')}`}
                          </div>
                          <div className="text-[11px] text-gray-400">All Included Feast</div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-[#CDC5B8] leading-relaxed mb-6">
                        {platter.description}
                      </p>

                      {/* Platter Itemized Breakdown */}
                      <div className="mb-6">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] mb-3 flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Includes in this Platter ({platter.includes?.length || 0} Items):</span>
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {platter.includes?.map((item, i) => (
                            <div
                              key={i}
                              className="flex items-start gap-2 text-xs text-[#E5DFC5] bg-[#1A1A24] p-2 rounded-lg border border-white/5"
                            >
                              <CheckCircle className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                              <span className="font-medium">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Platter Action Buttons */}
                    <div className="pt-5 border-t border-white/10 flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        onClick={() => onAddToCart(platter)}
                        className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#E5C058] to-[#B8860B] hover:brightness-110 text-black font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg active:scale-95"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add to Order Inquiry</span>
                      </button>

                      <a
                        href={`https://wa.me/${RESTAURANT_INFO.whatsapp}?text=${encodeURIComponent(
                          `Hello Yaseen Malak Restaurant! I would like to order/inquire about the ${platter.name} for my family.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-3 rounded-xl bg-[#1E1E28] hover:bg-[#282836] border border-[#D4AF37]/40 text-[#F3E5AB] font-semibold text-xs transition-all flex items-center gap-2"
                      >
                        <MessageSquare className="w-4 h-4 text-[#25D366]" />
                        <span>Order on WhatsApp</span>
                      </a>

                      <a
                        href={`tel:${RESTAURANT_INFO.phoneRaw}`}
                        className="px-4 py-3 rounded-xl bg-[#16161E] hover:bg-[#20202A] border border-white/10 text-gray-300 hover:text-white text-xs font-medium flex items-center gap-1.5"
                      >
                        <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>0314 3367335</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
