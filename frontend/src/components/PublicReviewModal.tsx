import React, { useState } from 'react';
import { X, Star, CheckCircle } from 'lucide-react';
import reviewService from '../services/reviewService';

interface PublicReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PublicReviewModal: React.FC<PublicReviewModalProps> = ({ isOpen, onClose }) => {
  const [customerName, setCustomerName] = useState('');
  const [location, setLocation] = useState('Peshawar, KP');
  const [rating, setRating] = useState(5);
  const [dishRecommended, setDishRecommended] = useState('Balochi Platter');
  const [review, setReview] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!customerName || !review) {
      setError('Please provide your name and review feedback.');
      return;
    }

    setIsSubmitting(true);
    try {
      await reviewService.createReview({
        customerName,
        rating,
        review,
        location,
        dishRecommended,
      });
      setIsSubmitted(true);
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to submit review.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="bg-[#14141B] border border-[#D4AF37]/40 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl space-y-6 relative text-[#ECE7DF]">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <h2 className="text-xl font-bold font-heading text-white">
              Write a <span className="text-gold-gradient">Review</span>
            </h2>
            <p className="text-xs text-gray-400">Share your dining experience at Yaseen Malak</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="text-center py-6 space-y-4 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center text-3xl mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-white">Review Submitted!</h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Thank you for your feedback! Your review has been submitted for administration review and will appear on our homepage once approved.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-[#D4AF37] text-black font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-[#B59226]"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-xl text-xs">
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-[#D4AF37] mb-1">Your Name *</label>
              <input
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="e.g. Kamran Khan"
                className="w-full px-3.5 py-2.5 bg-[#0B0B0E] border border-white/10 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#D4AF37] mb-1">Location</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Hayatabad, Peshawar"
                  className="w-full px-3.5 py-2.5 bg-[#0B0B0E] border border-white/10 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#D4AF37] mb-1">
                  Recommended Dish
                </label>
                <input
                  type="text"
                  value={dishRecommended}
                  onChange={(e) => setDishRecommended(e.target.value)}
                  placeholder="e.g. Balochi Sajji"
                  className="w-full px-3.5 py-2.5 bg-[#0B0B0E] border border-white/10 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#D4AF37] mb-1">Rating *</label>
              <div className="flex items-center space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 hover:scale-110 transition-transform"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        star <= rating ? 'text-amber-400 fill-current' : 'text-gray-600'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#D4AF37] mb-1">Your Review *</label>
              <textarea
                rows={3}
                required
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Tell us about your food taste, atmosphere, and service..."
                className="w-full px-3.5 py-2.5 bg-[#0B0B0E] border border-white/10 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-[#D4AF37] hover:bg-[#B59226] text-black font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Review'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
