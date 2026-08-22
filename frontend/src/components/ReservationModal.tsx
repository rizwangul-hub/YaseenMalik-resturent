import React, { useState } from 'react';
import { X, Calendar, Clock, Users, Send, Check } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { ReservationFormData } from '../types';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [formData, setFormData] = useState<ReservationFormData>({
    name: '',
    phone: '',
    guests: '6',
    date: '',
    time: '20:00',
    seatingPreference: 'family-hall',
    specialRequests: '',
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const message = `Hello Yaseen Malak Restaurant!%0A*Table Reservation Request:*%0A• Name: ${formData.name}%0A• Phone: ${formData.phone}%0A• Guests: ${formData.guests}%0A• Date: ${formData.date}%0A• Time: ${formData.time}%0A• Seating: ${formData.seatingPreference}%0A• Requests: ${formData.specialRequests || 'None'}`;
    setTimeout(() => {
      window.open(`https://wa.me/${RESTAURANT_INFO.whatsapp}?text=${message}`, '_blank');
      onClose();
      setSubmitted(false);
    }, 1000);
  };

  return (
    <div
      id="reservation-modal"
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-[#121218] border border-[#D4AF37]/40 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#E5C058]">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-heading text-xl font-bold text-white">
              Table & Hall Booking
            </h3>
            <p className="text-xs text-[#C8C0B2]">
              {RESTAURANT_INFO.name} • Hazar Khwani, Peshawar
            </p>
          </div>
        </div>

        {submitted ? (
          <div className="text-center py-8 space-y-3">
            <Check className="w-10 h-10 text-[#25D366] mx-auto" />
            <h4 className="font-heading text-lg font-bold text-white">
              Booking Request Received
            </h4>
            <p className="text-xs text-gray-400">
              Transferring you to our WhatsApp booking desk for instant confirmation...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#D4AF37] mb-1">
                Your Name *
              </label>
              <input
                type="text"
                required
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#1B1B25] border border-white/10 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#D4AF37] mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="0314 XXXXXXX"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#1B1B25] border border-white/10 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#D4AF37] mb-1">
                  Guests Count
                </label>
                <select
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#1B1B25] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                >
                  <option value="2-4">2 – 4 Persons</option>
                  <option value="6-8">6 – 8 Persons (Family)</option>
                  <option value="10-14">10 – 14 Persons (Platter Feast)</option>
                  <option value="15+">15+ Persons (Private Hall)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#D4AF37] mb-1">
                  Date
                </label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#1B1B25] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#D4AF37] mb-1">
                  Preferred Time
                </label>
                <select
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#1B1B25] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#D4AF37]"
                >
                  <option value="01:00 PM">01:00 PM (Lunch)</option>
                  <option value="07:30 PM">07:30 PM (Dinner)</option>
                  <option value="08:30 PM">08:30 PM (Dinner)</option>
                  <option value="09:30 PM">09:30 PM (Late Dinner)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#D4AF37] mb-1">
                Special Requests or Platter Pre-Order
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Balochi Platter pre-order, high chair needed, VIP family booth"
                value={formData.specialRequests}
                onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                className="w-full px-3.5 py-2 bg-[#1B1B25] border border-white/10 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#E5C058] to-[#B8860B] hover:brightness-110 text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Confirm via WhatsApp</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
