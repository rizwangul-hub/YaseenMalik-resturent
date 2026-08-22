import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Phone, ArrowDown, Sparkles, Image as ImageIcon, Flame } from 'lucide-react';
import { HERO_SLIDES, RESTAURANT_INFO } from '../data/restaurantData';
import { HeroSlide } from '../types';
import settingsService from '../services/settingsService';

interface HeroSliderProps {
  onOpenOrderDrawer?: () => void;
  onOpenReservation?: () => void;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({
  onOpenOrderDrawer,
  onOpenReservation
}) => {
  const [slides, setSlides] = useState<HeroSlide[]>(HERO_SLIDES);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const settings = await settingsService.getSettings();
        if (settings && settings.heroImages && Array.isArray(settings.heroImages) && settings.heroImages.length > 0) {
          setSlides(settings.heroImages);
        }
      } catch (e) {
        console.warn('[HeroSlider] Using default hero slides');
      }
    };
    fetchHeroData();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Change hero slides automatically every 3 seconds (3000ms)
  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(() => {
        nextSlide();
      }, 3000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, slides.length]);

  const currentSlide = slides[currentIndex] || slides[0];

  return (
    <section
      id="hero"
      aria-label="Hero Showcase"
      className="relative w-full h-[100svh] min-h-[640px] max-h-[1100px] overflow-hidden bg-[#0A0A0D] flex items-center"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Slides with 2-second Auto Transition */}
      {slides.map((slide, index) => {
        const isActive = index === currentIndex;
        return (
          <div
            key={slide.id || index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <div
              className={`w-full h-full transform transition-transform duration-[3000ms] ease-out ${
                isActive ? 'scale-105' : 'scale-100'
              }`}
            >
              <img
                src={slide.imageUrl}
                alt={slide.alt || slide.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center brightness-[0.75]"
              />
            </div>
            {/* Cinematic Multi-Layer Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0E] via-[#0B0B0E]/50 to-black/60" />
            <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/30 to-black/80" />
          </div>
        );
      })}

      {/* Main Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-16 pb-12 sm:pt-20">
        <div className="max-w-3xl">
          {/* Small Badge */}
          <div
            id="hero-badge"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#181822]/90 border border-[#D4AF37]/40 shadow-lg backdrop-blur-sm mb-4 animate-fade-in"
          >
            <Flame className="w-3.5 h-3.5 text-[#E5A93C] animate-pulse" />
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#F3E5AB]">
              {RESTAURANT_INFO.badge}
            </span>
          </div>

          {/* Main Heading */}
          <h1
            id="hero-main-title"
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.08] mb-3 font-heading drop-shadow-md"
          >
            {RESTAURANT_INFO.name}
          </h1>

          {/* Large Supporting Heading */}
          <h2
            id="hero-supporting-title"
            className="text-2xl sm:text-3xl lg:text-4xl font-normal font-subheading text-[#E5C058] italic mb-4 leading-snug"
          >
            "{RESTAURANT_INFO.tagline}"
          </h2>

          {/* Description */}
          <p
            id="hero-description"
            className="text-base sm:text-lg text-[#D6CEBF] font-normal leading-relaxed mb-8 max-w-2xl text-balance"
          >
            {RESTAURANT_INFO.description}
          </p>

          {/* Primary & Secondary CTAs */}
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <a
              href="#menu"
              id="hero-explore-menu-btn"
              className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#E5C058] to-[#B8860B] text-black font-bold text-sm sm:text-base tracking-wide uppercase shadow-xl hover:shadow-[#D4AF37]/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 group"
            >
              <span>Explore Menu</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>

            <a
              href="#contact"
              id="hero-visit-us-btn"
              className="px-7 py-3.5 rounded-xl bg-[#171720]/80 hover:bg-[#20202C] border border-[#D4AF37]/40 hover:border-[#D4AF37] text-[#ECE7DF] font-semibold text-sm sm:text-base tracking-wide transition-all shadow-lg backdrop-blur-sm"
            >
              Visit Us
            </a>

            <a
              href={`tel:${RESTAURANT_INFO.phoneRaw}`}
              id="hero-quick-call-btn"
              className="hidden sm:inline-flex items-center gap-2 text-xs font-semibold text-[#D4AF37] hover:text-[#FFF4D0] px-4 py-3 rounded-xl bg-black/40 border border-white/10"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{RESTAURANT_INFO.phone}</span>
            </a>
          </div>

          {/* Quick Location & Contact Badges */}
          <div className="flex flex-wrap items-center gap-y-2 gap-x-5 text-xs sm:text-sm text-[#BDB5A6]">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>📍 {RESTAURANT_INFO.shortAddress}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>📞 {RESTAURANT_INFO.phone}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Slide Mini Card (Right Desktop) */}
      <div className="hidden xl:block absolute right-12 bottom-20 z-20 max-w-xs">
        <div className="p-4 rounded-xl bg-[#14141A]/85 backdrop-blur-md border border-[#D4AF37]/30 shadow-2xl">
          <div className="text-[10px] uppercase tracking-wider text-[#D4AF37] font-bold mb-1">
            Highlighted Specialty
          </div>
          <div className="font-heading text-base font-bold text-white mb-0.5">
            {currentSlide?.featuredDish}
          </div>
          {currentSlide?.featuredPrice && (
            <div className="text-sm font-extrabold text-[#E5C058]">
              {currentSlide.featuredPrice}
            </div>
          )}
        </div>
      </div>

      {/* Manual Slider Navigation Arrows */}
      <button
        type="button"
        id="hero-slider-prev-btn"
        onClick={prevSlide}
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/50 hover:bg-[#D4AF37] text-white hover:text-black border border-white/15 hover:border-[#D4AF37] flex items-center justify-center transition-all shadow-lg backdrop-blur-sm"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        type="button"
        id="hero-slider-next-btn"
        onClick={nextSlide}
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-black/50 hover:bg-[#D4AF37] text-white hover:text-black border border-white/15 hover:border-[#D4AF37] flex items-center justify-center transition-all shadow-lg backdrop-blur-sm"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Pagination Indicators / Dots */}
      <div
        id="hero-pagination-dots"
        className="absolute bottom-7 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2.5"
      >
        {slides.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setCurrentIndex(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === currentIndex ? 'w-8 bg-[#D4AF37]' : 'w-2 bg-white/40 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Subtle Scroll Down Indicator */}
      <div className="hidden md:flex absolute bottom-6 left-8 z-20 items-center gap-2 text-[11px] text-[#A89E90] uppercase tracking-widest pointer-events-none">
        <ArrowDown className="w-3.5 h-3.5 text-[#D4AF37] animate-bounce" />
        <span>Scroll to explore</span>
      </div>
    </section>
  );
};
