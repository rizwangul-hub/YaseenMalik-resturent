import React, { useState, useEffect } from 'react';
import { Star, MessageSquareQuote, ChevronLeft, ChevronRight, CheckCircle2, User, Plus } from 'lucide-react';
import { REVIEWS } from '../data/restaurantData';
import { Review } from '../types';
import reviewService from '../services/reviewService';
import { PublicReviewModal } from './PublicReviewModal';

export const ReviewsSection: React.FC = () => {
  const [reviewsList, setReviewsList] = useState<Review[]>(REVIEWS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false);

  useEffect(() => {
    const fetchApprovedReviews = async () => {
      try {
        const res = await reviewService.getReviews();
        if (res && res.length > 0) {
          setReviewsList(res);
        }
      } catch (e) {
        console.warn('[ReviewsSection] Using fallback reviews');
      }
    };
    fetchApprovedReviews();
  }, []);

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviewsList.length);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviewsList.length) % reviewsList.length);
  };

  useEffect(() => {
    if (reviewsList.length === 0) return;
    const timer = setInterval(() => {
      nextReview();
    }, 7000);
    return () => clearInterval(timer);
  }, [reviewsList.length]);

  const currentRev = reviewsList[currentIndex] || reviewsList[0];

  return (
    <section id="reviews" className="py-20 sm:py-28 bg-[#0B0B0E] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181822] border border-[#D4AF37]/30 text-[#E5C058] text-xs font-bold uppercase tracking-[0.2em] mb-3">
            <Star className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />
            <span>Guest Experiences</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-heading tracking-tight mb-3">
            What Our <span className="text-gold-gradient">Guests Say</span>
          </h2>
          <p className="text-sm sm:text-base text-[#BDB5A6] font-normal leading-relaxed mb-4">
            Real impressions from families, food lovers, and travelers dining at our Peshawar restaurant.
          </p>

          <button
            onClick={() => setIsWriteReviewOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-bold transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Write a Review</span>
          </button>
        </div>

        {/* Testimonial Carousel Card */}
        {currentRev && (
          <div className="max-w-4xl mx-auto relative">
            <div className="p-8 sm:p-12 rounded-3xl bg-[#14141B] border border-white/10 shadow-2xl relative">
              {/* Large Quote Icon */}
              <div className="absolute top-6 right-8 text-[#D4AF37]/15">
                <MessageSquareQuote className="w-16 h-16" />
              </div>

              <div className="relative z-10">
                {/* Star Rating */}
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(currentRev.rating || 5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-[#D4AF37] text-[#D4AF37]"
                    />
                  ))}
                </div>

                {/* Review Text */}
                <blockquote className="text-base sm:text-xl text-[#ECE7DF] font-serif italic leading-relaxed mb-8">
                  "{currentRev.comment || currentRev.review}"
                </blockquote>

                {/* Author & Recommended Dish Footer */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-[#20202C] border border-[#D4AF37]/40 flex items-center justify-center text-[#E5C058]">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-heading text-base font-bold text-white flex items-center gap-2">
                        <span>{currentRev.author || currentRev.customerName}</span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#25D366]" title="Verified Diner" />
                      </div>
                      <div className="text-xs text-gray-400">
                        {currentRev.location || 'Peshawar, KP'} {currentRev.date ? `• ${currentRev.date}` : ''}
                      </div>
                    </div>
                  </div>

                  {currentRev.dishRecommended && (
                    <div className="px-3.5 py-1.5 rounded-lg bg-[#1D1D28] border border-[#D4AF37]/20 text-xs text-[#E5C058] font-semibold">
                      Recommended: {currentRev.dishRecommended}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Carousel Controls */}
            <div className="flex items-center justify-between mt-6 px-2">
              <div className="flex items-center gap-2">
                {reviewsList.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === currentIndex ? 'w-8 bg-[#D4AF37]' : 'w-2 bg-white/30 hover:bg-white/60'
                    }`}
                    aria-label={`Go to review ${idx + 1}`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={prevReview}
                  className="w-10 h-10 rounded-full bg-[#181822] hover:bg-[#D4AF37] text-white hover:text-black border border-white/10 flex items-center justify-center transition-all"
                  aria-label="Previous Review"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={nextReview}
                  className="w-10 h-10 rounded-full bg-[#181822] hover:bg-[#D4AF37] text-white hover:text-black border border-white/10 flex items-center justify-center transition-all"
                  aria-label="Next Review"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <PublicReviewModal
        isOpen={isWriteReviewOpen}
        onClose={() => setIsWriteReviewOpen(false)}
      />
    </section>
  );
};
