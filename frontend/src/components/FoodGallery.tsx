import React, { useState } from 'react';
import { Camera, Maximize2, X, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/restaurantData';
import { GalleryItem } from '../types';

export const FoodGallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const categories = [
    { id: 'all', label: 'All Photos' },
    { id: 'platters', label: 'Family Platters' },
    { id: 'bbq', label: 'BBQ & Kababs' },
    { id: 'sajji', label: 'Sajji & Rice' },
    { id: 'ambiance', label: 'Restaurant & Dining' },
  ];

  const filteredGallery = GALLERY_ITEMS.filter(
    (item) => selectedCategory === 'all' || item.category === selectedCategory
  );

  const openLightbox = (index: number) => {
    setActiveLightboxIndex(index);
  };

  const closeLightbox = () => {
    setActiveLightboxIndex(null);
  };

  const nextLightbox = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((activeLightboxIndex + 1) % filteredGallery.length);
    }
  };

  const prevLightbox = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex(
        (activeLightboxIndex - 1 + filteredGallery.length) % filteredGallery.length
      );
    }
  };

  return (
    <section id="gallery" className="py-20 sm:py-28 bg-[#0B0B0E] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181822] border border-[#D4AF37]/30 text-[#E5C058] text-xs font-bold uppercase tracking-[0.2em] mb-3">
            <Camera className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Visual Feast</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-heading tracking-tight mb-2">
            Food That <span className="text-gold-gradient">Deserves a Picture</span>
          </h2>
          <p className="text-sm sm:text-base text-[#BDB5A6] font-normal leading-relaxed">
            A glimpse into the culinary craft, live coal embers, and grand platters prepared at Yaseen Malak Restaurant.
          </p>
        </div>

        {/* Gallery Filter Tabs */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-[#D4AF37] text-black shadow-md font-bold'
                  : 'bg-[#14141B] hover:bg-[#1D1D26] text-[#D1C9BE] border border-white/5'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Masonry / Grid Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGallery.map((item, index) => (
            <div
              key={item.id}
              id={`gallery-item-${item.id}`}
              onClick={() => openLightbox(index)}
              className="group relative rounded-2xl overflow-hidden bg-[#14141A] border border-white/10 hover:border-[#D4AF37]/50 shadow-xl cursor-pointer h-72 sm:h-80"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              {/* Hover Overlay Content */}
              <div className="absolute inset-0 p-5 flex flex-col justify-between">
                <div className="flex justify-end">
                  <div className="w-8 h-8 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 duration-300">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] mb-1 block">
                    {item.categoryLabel}
                  </span>
                  <h3 className="font-heading text-base font-bold text-white mb-1 group-hover:text-[#F3E5AB] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#CDC5B8] line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeLightboxIndex !== null && filteredGallery[activeLightboxIndex] && (
        <div
          id="gallery-lightbox"
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fade-in"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute top-6 right-6 z-50 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Arrows */}
          <button
            type="button"
            onClick={prevLightbox}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-black/60 hover:bg-[#D4AF37] text-white hover:text-black flex items-center justify-center transition-all border border-white/20"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            type="button"
            onClick={nextLightbox}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-black/60 hover:bg-[#D4AF37] text-white hover:text-black flex items-center justify-center transition-all border border-white/20"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image & Caption Box */}
          <div
            className="max-w-4xl w-full max-h-[85vh] flex flex-col items-center justify-center relative"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={filteredGallery[activeLightboxIndex].imageUrl}
              alt={filteredGallery[activeLightboxIndex].title}
              referrerPolicy="no-referrer"
              className="max-h-[65vh] w-auto max-w-full object-contain rounded-xl border border-white/15 shadow-2xl mb-4"
            />
            <div className="text-center">
              <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
                {filteredGallery[activeLightboxIndex].categoryLabel}
              </span>
              <h3 className="font-heading text-xl font-bold text-white mb-1">
                {filteredGallery[activeLightboxIndex].title}
              </h3>
              <p className="text-xs sm:text-sm text-[#CDC5B8] max-w-lg mx-auto">
                {filteredGallery[activeLightboxIndex].description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
