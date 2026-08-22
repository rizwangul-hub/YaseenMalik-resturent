import React from 'react';
import { X, Flame, Users, Clock, CheckCircle2, Phone, MessageSquare, Plus } from 'lucide-react';
import { MenuItem, Platter } from '../types';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface DishDetailModalProps {
  item: MenuItem | Platter | null;
  onClose: () => void;
  onAddToCart: (item: MenuItem | Platter) => void;
}

export const DishDetailModal: React.FC<DishDetailModalProps> = ({
  item,
  onClose,
  onAddToCart,
}) => {
  if (!item) return null;

  const isPlatter = 'includes' in item;

  return (
    <div
      id="dish-detail-modal"
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-[#121218] border border-[#D4AF37]/40 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center border border-white/20 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Image */}
        <div className="relative h-64 sm:h-72 overflow-hidden bg-[#181822]">
          <img
            src={item.imageUrl}
            alt={item.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121218] via-transparent to-black/40" />

          <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
            <div>
              <span className="px-2.5 py-1 rounded bg-[#8B1E22] text-[#FFF4D0] text-[10px] font-bold uppercase tracking-wider">
                {isPlatter ? 'Signature Royal Feast' : 'Authentic Peshawar Cuisine'}
              </span>
              <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-white mt-1">
                {item.name}
              </h3>
              {item.urduName && (
                <div className="font-urdu text-sm text-[#D4AF37]">
                  {item.urduName}
                </div>
              )}
            </div>

            <div className="text-right">
              <div className="text-2xl font-extrabold text-[#E5C058] font-heading">
                {item.priceFormatted}
              </div>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#D4AF37] mb-2">
              Dish Overview & Flavor Profile
            </h4>
            <p className="text-sm text-[#D1C9BE] leading-relaxed">
              {item.description}
            </p>
          </div>

          {/* Platter breakdown if available */}
          {isPlatter && (item as Platter).includes && (
            <div className="p-4 rounded-2xl bg-[#181822] border border-white/10 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#E5C058] flex items-center gap-1.5">
                <span>Complete Feast Contents ({(item as Platter).includes.length} Items):</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {(item as Platter).includes.map((inc, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-[#E5DFC5]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                    <span>{inc}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action CTAs */}
          <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => {
                onAddToCart(item);
                onClose();
              }}
              className="flex-1 py-3 px-5 rounded-xl bg-[#D4AF37] hover:bg-[#E5C058] text-black font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              <Plus className="w-4 h-4" />
              <span>Add to Order Inquiry</span>
            </button>

            <a
              href={`https://wa.me/${RESTAURANT_INFO.whatsapp}?text=${encodeURIComponent(
                `Hello Yaseen Malak Restaurant! I would like to ask about ${item.name} (${item.priceFormatted}).`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-4 rounded-xl bg-[#1E1E28] hover:bg-[#282836] border border-[#D4AF37]/40 text-[#E5C058] font-semibold text-xs flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-[#25D366]" />
              <span>WhatsApp</span>
            </a>

            <a
              href={`tel:${RESTAURANT_INFO.phoneRaw}`}
              className="py-3 px-4 rounded-xl bg-[#16161F] hover:bg-[#20202A] border border-white/10 text-white font-medium text-xs flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>0314 3367335</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
