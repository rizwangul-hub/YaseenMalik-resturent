import React, { useState } from 'react';
import { MapPin, Phone, Clock, Navigation, Send, MessageSquare, Check, Calendar } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { ReservationFormData } from '../types';
import reservationService from '../services/reservationService';
import messageService from '../services/messageService';

export const LocationContact: React.FC = () => {
  const [formData, setFormData] = useState<ReservationFormData>({
    name: '',
    phone: '',
    guests: '4',
    date: new Date().toISOString().split('T')[0],
    time: '19:00',
    seatingPreference: 'family-hall',
    specialRequests: '',
  });

  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [reservationSubmitted, setReservationSubmitted] = useState(false);
  const [messageSubmitted, setMessageSubmitted] = useState(false);
  const [messageError, setMessageError] = useState<string | null>(null);

  const handleReservationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setReservationSubmitted(true);

    try {
      await reservationService.createReservation(formData);
    } catch (err) {
      console.warn('[LocationContact] Failed to record DB reservation, proceeding with WhatsApp');
    }

    const message = `Hello Yaseen Malak Restaurant!%0A*Table Reservation Request:*%0A• Name: ${formData.name}%0A• Phone: ${formData.phone}%0A• Guests: ${formData.guests}%0A• Date: ${formData.date}%0A• Time: ${formData.time}%0A• Seating: ${formData.seatingPreference}%0A• Note: ${formData.specialRequests || 'None'}`;

    setTimeout(() => {
      window.open(`https://wa.me/${RESTAURANT_INFO.whatsapp}?text=${message}`, '_blank');
    }, 800);
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessageError(null);

    if (!contactData.name || !contactData.phone || !contactData.message) {
      setMessageError('Please fill in your name, phone, and message.');
      return;
    }

    try {
      await messageService.sendMessage(contactData);
      setMessageSubmitted(true);
      setContactData({ name: '', email: '', phone: '', message: '' });
    } catch (err: any) {
      setMessageError(err?.response?.data?.message || 'Failed to send message.');
    }
  };

  return (
    <section id="contact" className="py-20 sm:py-28 bg-[#0B0B0E] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181822] border border-[#D4AF37]/30 text-[#E5C058] text-xs font-bold uppercase tracking-[0.2em] mb-3">
            <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Visit & Connect</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-heading tracking-tight mb-3">
            Find & Contact <span className="text-gold-gradient">Our Restaurant</span>
          </h2>
          <p className="text-sm sm:text-base text-[#BDB5A6] font-normal leading-relaxed">
            Conveniently situated on the main Peshawar Ring Road at Hazar Khwani Chowk with ample parking space and private family halls.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Contact Cards & Contact Form */}
          <div className="lg:col-span-5 space-y-6">
            {/* Primary Restaurant Location Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#14141B] border border-[#D4AF37]/30 shadow-2xl space-y-6">
              <div>
                <h3 className="font-heading text-2xl font-bold text-white mb-1">
                  {RESTAURANT_INFO.name}
                </h3>
                <p className="font-urdu text-sm text-[#D4AF37]">
                  {RESTAURANT_INFO.urduName}
                </p>
              </div>

              {/* Details List */}
              <div className="space-y-4 text-xs sm:text-sm text-[#CDC5B8]">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#1F1F2B] border border-[#D4AF37]/30 flex items-center justify-center text-[#E5C058] shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-white mb-0.5">Address</div>
                    <p className="leading-relaxed text-[#B8AF9E]">
                      {RESTAURANT_INFO.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#1F1F2B] border border-[#D4AF37]/30 flex items-center justify-center text-[#E5C058] shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-white mb-0.5">Phone & Inquiries</div>
                    <a
                      href={`tel:${RESTAURANT_INFO.phoneRaw}`}
                      className="text-[#E5C058] hover:underline font-bold text-sm block"
                    >
                      {RESTAURANT_INFO.phone}
                    </a>
                    <span className="text-[11px] text-gray-400">Available for orders & bookings</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#1F1F2B] border border-[#D4AF37]/30 flex items-center justify-center text-[#E5C058] shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-white mb-0.5">Opening Hours</div>
                    <div className="text-white font-medium">{RESTAURANT_INFO.hours}</div>
                    <div className="text-[11px] text-gray-400">{RESTAURANT_INFO.hoursDays}</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={`tel:${RESTAURANT_INFO.phoneRaw}`}
                  id="contact-call-btn"
                  className="py-3.5 px-4 rounded-xl bg-[#D4AF37] hover:bg-[#E5C058] text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Now</span>
                </a>

                <a
                  href={RESTAURANT_INFO.mapDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="contact-directions-btn"
                  className="py-3.5 px-4 rounded-xl bg-[#1E1E28] hover:bg-[#282836] border border-[#D4AF37]/40 text-[#ECE7DF] font-semibold text-xs flex items-center justify-center gap-2 transition-all"
                >
                  <Navigation className="w-4 h-4 text-[#D4AF37]" />
                  <span>Get Directions</span>
                </a>
              </div>
            </div>

            {/* Direct Contact Message Form */}
            <div className="p-6 rounded-3xl bg-[#14141B] border border-white/10 shadow-2xl space-y-4">
              <h4 className="font-heading text-base font-bold text-white">Send Us a Direct Message</h4>
              {messageSubmitted ? (
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs text-center">
                  ✓ Your message has been sent to restaurant management!
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-3">
                  {messageError && (
                    <div className="text-xs text-red-400">{messageError}</div>
                  )}
                  <input
                    type="text"
                    required
                    placeholder="Your Name *"
                    value={contactData.name}
                    onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#1B1B25] border border-white/10 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="tel"
                      required
                      placeholder="Phone *"
                      value={contactData.phone}
                      onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#1B1B25] border border-white/10 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]"
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      value={contactData.email}
                      onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#1B1B25] border border-white/10 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                  <textarea
                    rows={3}
                    required
                    placeholder="Your inquiry or catering message..."
                    value={contactData.message}
                    onChange={(e) => setContactData({ ...contactData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#1B1B25] border border-white/10 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]"
                  />
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#E5C058] text-black font-bold text-xs uppercase tracking-wider transition-all"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Google Maps & Table Reservation */}
          <div className="lg:col-span-7 space-y-6">
            {/* Embedded Google Map */}
            <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-[#14141B] h-64 sm:h-72 relative">
              <iframe
                title="Yaseen Malak Restaurant Location Map"
                src={RESTAURANT_INFO.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute top-3 left-3 px-3 py-1.5 rounded-lg bg-black/85 border border-[#D4AF37]/40 text-xs font-bold text-[#E5C058] backdrop-blur-sm">
                📍 Chowk, Peshawar Ring Road, Hazar Khwani
              </div>
            </div>

            {/* Table / Family Hall Reservation Form */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#14141B] border border-white/10 shadow-2xl">
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div>
                  <h3 className="font-heading text-lg sm:text-xl font-bold text-white">
                    Reserve a Table or Family Hall
                  </h3>
                  <p className="text-xs text-[#A89E90]">
                    Quick booking for family dinners, birthdays, and platter banquets.
                  </p>
                </div>
                <Calendar className="w-6 h-6 text-[#D4AF37]" />
              </div>

              {reservationSubmitted ? (
                <div className="p-6 rounded-2xl bg-[#132418] border border-[#25D366]/40 text-center space-y-2">
                  <Check className="w-8 h-8 text-[#25D366] mx-auto" />
                  <h4 className="font-heading text-base font-bold text-white">
                    Reservation Details Submitted!
                  </h4>
                  <p className="text-xs text-gray-300">
                    Connecting to WhatsApp to confirm your table with our reservation desk...
                  </p>
                </div>
              ) : (
                <form onSubmit={handleReservationSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#D4AF37] mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Tariq Khan"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#1B1B25] border border-white/10 rounded-xl text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#D4AF37] mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="03XX XXXXXXX"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#1B1B25] border border-white/10 rounded-xl text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#D4AF37] mb-1">
                        Guests
                      </label>
                      <select
                        value={formData.guests}
                        onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#1B1B25] border border-white/10 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                      >
                        <option value="2-3">2 – 3 Guests</option>
                        <option value="4-6">4 – 6 Guests (Family)</option>
                        <option value="8-12">8 – 12 Guests (Platter Feast)</option>
                        <option value="15+">15+ Guests (Large Party)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#D4AF37] mb-1">
                        Date
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#1B1B25] border border-white/10 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#D4AF37] mb-1">
                        Time
                      </label>
                      <select
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-[#1B1B25] border border-white/10 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-[#D4AF37]"
                      >
                        <option value="12:30 PM">12:30 PM (Lunch)</option>
                        <option value="02:00 PM">02:00 PM (Lunch)</option>
                        <option value="06:30 PM">06:30 PM (Dinner)</option>
                        <option value="08:00 PM">08:00 PM (Peak Dinner)</option>
                        <option value="09:30 PM">09:30 PM (Late Dinner)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#D4AF37] mb-1">
                      Seating Preference
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'family-hall', label: 'Family Hall' },
                        { id: 'main-dining', label: 'Main Dining' },
                        { id: 'vip-booth', label: 'VIP Booth' },
                      ].map((type) => (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, seatingPreference: type.id as any })}
                          className={`py-2 px-2.5 rounded-lg text-[11px] font-semibold border text-center transition-all ${
                            formData.seatingPreference === type.id
                              ? 'bg-[#D4AF37] text-black border-[#D4AF37] font-bold'
                              : 'bg-[#181822] text-gray-300 border-white/10 hover:border-white/20'
                          }`}
                        >
                          {type.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    id="reservation-submit-btn"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#E5C058] to-[#B8860B] hover:brightness-110 text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all active:scale-[0.99]"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Reservation Request</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
