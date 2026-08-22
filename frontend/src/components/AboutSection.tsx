import React from 'react';
import { Flame, Utensils, Heart, Award, CheckCircle2, ArrowRight } from 'lucide-react';
import peshawarDiningImg from '../assets/images/peshawar_dining_1787336224131.jpg';
import { RESTAURANT_INFO, yasenLogoImg } from '../data/restaurantData';

interface AboutSectionProps {
  onOpenReservation?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenReservation }) => {
  const featureCards = [
    {
      id: "feat-1",
      icon: "🔥",
      title: "Authentic BBQ",
      urdu: "اصلی کوئلہ باربی کیو",
      desc: "Live charcoal grilling with secret Balochi spices and tender natural marinades."
    },
    {
      id: "feat-2",
      icon: "🍽️",
      title: "Generous Platters",
      urdu: "شاہی خاندانی پلیٹرز",
      desc: "Lavish multi-dish feasts curated for joyful sharing among families & friends."
    },
    {
      id: "feat-3",
      icon: "❤️",
      title: "Family Dining",
      urdu: "خاندانی پرسکون ماحول",
      desc: "Spacious private halls, warm traditional hospitality, and impeccable cleanliness."
    }
  ];

  return (
    <section id="about" className="relative py-20 sm:py-28 bg-[#0E0E12] overflow-hidden">
      {/* Decorative ambient background accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#8B1E22]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Visual Showcase with Yaseen Malak Picture */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none space-y-4">
              {/* Outer decorative golden offset border */}
              <div className="absolute -inset-3 rounded-2xl border border-[#D4AF37]/25 transform -rotate-1 hidden sm:block pointer-events-none" />
              
              {/* Main Image Container with Yaseen Malak */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#D4AF37]/40 bg-[#16161D]">
                <img
                  src={yasenLogoImg}
                  alt="Yaseen Malak - Restaurant Founder"
                  referrerPolicy="no-referrer"
                  className="w-full h-[360px] sm:h-[420px] object-cover object-top hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                {/* Floating Experience Badge */}
                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-[#14141AE6] backdrop-blur-md border border-[#D4AF37]/30 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-[#E5C058]">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-heading text-sm font-bold text-white">
                        Yaseen Malak Restaurant
                      </div>
                      <div className="text-[11px] text-[#C8C0B2]">
                        Chowk, Peshawar Ring Road, Hazar Khwani
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold text-[#E5C058]">100% Halal</div>
                    <div className="text-[10px] text-gray-400">Peshawar Specialty</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Feature Cards */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            {/* Section Tag */}
            <div className="flex items-center gap-2 mb-3">
              <span className="h-px w-8 bg-[#D4AF37]" />
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
                Authentic Heritage
              </span>
            </div>

            {/* Main Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-heading tracking-tight mb-4 leading-tight">
              A Taste Worth <span className="text-gold-gradient">Coming Back For</span>
            </h2>

            {/* Sub-headline in Urdu & English */}
            <p className="font-subheading text-lg sm:text-xl text-[#E5C058] italic mb-5 leading-relaxed">
              Serving the authentic culinary treasures of Peshawar, Balochistan, and Khyber.
            </p>

            {/* Story Paragraph */}
            <p className="text-sm sm:text-base text-[#CBC3B5] leading-relaxed mb-8">
              At <strong className="text-white font-semibold">{RESTAURANT_INFO.name}</strong>, located at Chowk, Peshawar Ring Road, Hazar Khwani, every recipe is crafted to celebrate Pakistan's rich gastronomic traditions. From slow-roasted Balochi Sajji with steaming saffron-infused Kabuli rice to sizzling skewers of Malai Boti and tribal Shinwari cuts, we bring families together over generous, piping-hot platters.
            </p>

            {/* 3 Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-8">
              {featureCards.map((card) => (
                <div
                  key={card.id}
                  id={card.id}
                  className="p-4 rounded-xl bg-[#14141A] border border-white/10 hover:border-[#D4AF37]/40 transition-all hover:-translate-y-1 group"
                >
                  <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">
                    {card.icon}
                  </div>
                  <div className="font-heading text-sm font-bold text-white mb-0.5">
                    {card.title}
                  </div>
                  <div className="font-urdu text-[11px] text-[#D4AF37] mb-1.5">
                    {card.urdu}
                  </div>
                  <p className="text-xs text-[#A89E90] leading-snug">
                    {card.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Call to action buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#platters"
                id="about-view-platters-btn"
                className="px-6 py-3 rounded-xl bg-[#D4AF37] hover:bg-[#E5C058] text-black font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg"
              >
                <span>View Signature Platters</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>

              <a
                href={`tel:${RESTAURANT_INFO.phoneRaw}`}
                id="about-call-btn"
                className="px-5 py-3 rounded-xl bg-[#181820] hover:bg-[#22222D] border border-[#D4AF37]/30 text-[#ECE7DF] font-semibold text-xs transition-all"
              >
                Call: {RESTAURANT_INFO.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
