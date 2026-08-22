import React from 'react';
import { Video, Share2, ArrowUpRight, Flame, Heart, Play } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import heroGrillLiveImg from '../assets/images/hero_grill_live_1787336174779.jpg';

export const SocialSection: React.FC = () => {
  return (
    <section id="social" className="py-20 sm:py-24 bg-[#0E0E14] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="rounded-3xl bg-gradient-to-r from-[#14141C] via-[#1A1A26] to-[#14141C] border border-[#D4AF37]/30 p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Narrative */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#20202E] text-[#E5C058] text-xs font-bold uppercase tracking-[0.2em] mb-4">
                <Video className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Behind the Grill Videos</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading tracking-tight mb-4">
                Follow <span className="text-gold-gradient">Yaseen Malak Restaurant</span>
              </h2>
              <p className="text-sm sm:text-base text-[#CBC3B5] leading-relaxed mb-6">
                Watch our master chefs grill piping-hot Balochi Sajji over glowing coals, assemble gigantic family platters, and share daily special updates on TikTok and Facebook.
              </p>

              {/* Social CTA Links */}
              <div className="flex flex-wrap items-center gap-4">
                {/* TikTok Card */}
                <a
                  href={RESTAURANT_INFO.social.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="social-tiktok-link"
                  className="px-5 py-3.5 rounded-xl bg-[#121217] hover:bg-[#1E1E28] border border-white/15 hover:border-[#FE2C55] text-white flex items-center gap-3 transition-all group shadow-md"
                >
                  <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center text-white font-black text-sm group-hover:scale-110 transition-transform">
                    Tk
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-bold text-white group-hover:text-[#FE2C55] transition-colors flex items-center gap-1">
                      <span>TikTok Food Videos</span>
                      <ArrowUpRight className="w-3 h-3 opacity-60 group-hover:opacity-100" />
                    </div>
                    <div className="text-[11px] text-gray-400">
                      {RESTAURANT_INFO.social.tiktokHandle}
                    </div>
                  </div>
                </a>

                {/* Facebook Card */}
                <a
                  href={RESTAURANT_INFO.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="social-facebook-link"
                  className="px-5 py-3.5 rounded-xl bg-[#121217] hover:bg-[#1E1E28] border border-white/15 hover:border-[#1877F2] text-white flex items-center gap-3 transition-all group shadow-md"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#1877F2] flex items-center justify-center text-white font-bold text-sm group-hover:scale-110 transition-transform">
                    f
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-bold text-white group-hover:text-[#1877F2] transition-colors flex items-center gap-1">
                      <span>Facebook Community</span>
                      <ArrowUpRight className="w-3 h-3 opacity-60 group-hover:opacity-100" />
                    </div>
                    <div className="text-[11px] text-gray-400">
                      {RESTAURANT_INFO.social.facebookHandle}
                    </div>
                  </div>
                </a>
              </div>
            </div>

            {/* Right Video Teaser Graphic */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black/60 shadow-xl group aspect-video">
                <img
                  src={heroGrillLiveImg}
                  alt="Live BBQ Video Reel Preview"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-[#D4AF37] text-black flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 fill-black translate-x-0.5" />
                  </div>
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-[#E5C058]">
                  <span className="font-semibold">Live Peshawar Ring Road Sizzle</span>
                  <span className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 fill-[#E5C058]" /> 10k+ Views
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
