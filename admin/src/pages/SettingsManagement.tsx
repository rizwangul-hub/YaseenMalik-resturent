import React, { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Save, Image as ImageIcon, Plus, Trash2 } from 'lucide-react';
import settingsService from '../services/settingsService';
import { useToast } from '../context/ToastContext';
import { SkeletonCard } from '../components/LoadingSkeleton';
import { HERO_SLIDES } from '../data/restaurantData';

export const SettingsManagement: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [settings, setSettings] = useState<any>({
    restaurantName: 'Yaseen Malak Restaurant',
    urduName: 'یاسین ملک ریسٹورنٹ',
    badge: 'AUTHENTIC TASTE OF PESHAWAR',
    tagline: 'Where Every Bite Tells a Story',
    description: 'Experience delicious Pakistani BBQ, traditional platters, Balochi Sajji and flavorful dishes prepared for unforgettable dining moments.',
    phone: '0314 3367335',
    phoneRaw: '03143367335',
    phoneInternational: '+923143367335',
    whatsapp: '923143367335',
    address: 'Chowk, Peshawar Ring Road, Hazar Khwani, Peshawar, 25000',
    shortAddress: 'Hazar Khwani, Peshawar Ring Road',
    city: 'Peshawar, Pakistan',
    postalCode: '25000',
    openingHours: '11:00 AM – 11:00 PM',
    hoursDays: 'Monday – Sunday (7 Days Open)',
    email: 'info@yaseenmalakrestaurant.com',
    socialLinks: {
      tiktok: 'https://www.tiktok.com/@yaseenmalakrestaurant',
      facebook: 'https://www.facebook.com/yaseenmalakrestaurant',
      tiktokHandle: '@yaseenmalakrestaurant',
      facebookHandle: 'Yaseen Malak Restaurant Peshawar',
    },
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d105885.34416550787!2d71.4932087593259!3d33.97829285093766!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38d9172f3e8fdb1f%3A0x6b7720982d6b412b!2sHazar%20Khwani%2C%20Peshawar%2C%20Khyber%20Pakhtunkhwa%2C%20Pakistan!5e0!3m2!1sen!2s!4v1710000000000!5m2!1sen!2s',
    mapDirectionsUrl: 'https://maps.google.com/?q=Chowk+Peshawar+Ring+Road+Hazar+Khwani+Peshawar',
  });

  const [heroSlides, setHeroSlides] = useState<any[]>(HERO_SLIDES);

  const { showToast } = useToast();

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setIsLoading(true);
    try {
      const res = await settingsService.getSettings();
      if (res) {
        setSettings({ ...settings, ...res });
        if (res.heroImages && Array.isArray(res.heroImages) && res.heroImages.length > 0) {
          setHeroSlides(res.heroImages);
        }
      }
    } catch (err) {
      showToast('Failed to load settings', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const payload = {
        ...settings,
        heroImages: heroSlides,
      };
      await settingsService.updateSettings(payload);
      showToast('Restaurant settings & Hero images saved successfully!', 'success');
    } catch (err) {
      showToast('Failed to save settings', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleHeroSlideChange = (index: number, field: string, value: string) => {
    const updated = [...heroSlides];
    updated[index] = { ...updated[index], [field]: value };
    setHeroSlides(updated);
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Restaurant Settings & CMS</h1>
          <p className="text-xs text-gray-400">Control public contact info, hours, address & Hero slides</p>
        </div>
        <button
          onClick={handleSaveSettings}
          disabled={isSaving}
          className="flex items-center space-x-2 px-5 py-2.5 bg-[#D4AF37] hover:bg-[#B59226] text-black font-bold rounded-xl text-sm transition-colors shadow-lg shadow-[#D4AF37]/20"
        >
          <Save className="w-4 h-4" />
          <span>{isSaving ? 'Saving...' : 'Save All Settings'}</span>
        </button>
      </div>

      {isLoading ? (
        <SkeletonCard />
      ) : (
        <form onSubmit={handleSaveSettings} className="space-y-8">
          {/* General Restaurant Info */}
          <div className="bg-[#14151B] border border-white/10 rounded-2xl p-6 space-y-6">
            <h2 className="text-lg font-bold text-white border-b border-white/10 pb-3 flex items-center space-x-2">
              <SettingsIcon className="w-5 h-5 text-[#D4AF37]" />
              <span>General Restaurant Info</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                  Restaurant Name
                </label>
                <input
                  type="text"
                  value={settings.restaurantName}
                  onChange={(e) => setSettings({ ...settings, restaurantName: e.target.value })}
                  className="w-full bg-[#0D0E12] border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                  Urdu Name
                </label>
                <input
                  type="text"
                  value={settings.urduName}
                  onChange={(e) => setSettings({ ...settings, urduName: e.target.value })}
                  className="w-full bg-[#0D0E12] border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:border-[#D4AF37] focus:outline-none font-urdu"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={settings.phone}
                  onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                  className="w-full bg-[#0D0E12] border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={settings.email}
                  onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                  className="w-full bg-[#0D0E12] border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                Full Physical Address
              </label>
              <input
                type="text"
                value={settings.address}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                className="w-full bg-[#0D0E12] border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:border-[#D4AF37] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                  Opening Hours
                </label>
                <input
                  type="text"
                  value={settings.openingHours}
                  onChange={(e) => setSettings({ ...settings, openingHours: e.target.value })}
                  className="w-full bg-[#0D0E12] border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                  Open Days
                </label>
                <input
                  type="text"
                  value={settings.hoursDays}
                  onChange={(e) => setSettings({ ...settings, hoursDays: e.target.value })}
                  className="w-full bg-[#0D0E12] border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Hero Slider Management */}
          <div className="bg-[#14151B] border border-white/10 rounded-2xl p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h2 className="text-lg font-bold text-white flex items-center space-x-2">
                <ImageIcon className="w-5 h-5 text-[#D4AF37]" />
                <span>Homepage Hero Slider CMS ({heroSlides.length} Slides)</span>
              </h2>
            </div>

            <div className="space-y-6">
              {heroSlides.map((slide, idx) => (
                <div key={idx} className="bg-[#0D0E12] border border-white/10 rounded-2xl p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
                      Hero Slide #{idx + 1}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
                        Slide Title
                      </label>
                      <input
                        type="text"
                        value={slide.title}
                        onChange={(e) => handleHeroSlideChange(idx, 'title', e.target.value)}
                        className="w-full bg-[#14151B] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:border-[#D4AF37] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
                        Subtitle
                      </label>
                      <input
                        type="text"
                        value={slide.subtitle}
                        onChange={(e) => handleHeroSlideChange(idx, 'subtitle', e.target.value)}
                        className="w-full bg-[#14151B] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:border-[#D4AF37] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
                        Tagline / Badge
                      </label>
                      <input
                        type="text"
                        value={slide.tagline}
                        onChange={(e) => handleHeroSlideChange(idx, 'tagline', e.target.value)}
                        className="w-full bg-[#14151B] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:border-[#D4AF37] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
                        Featured Dish
                      </label>
                      <input
                        type="text"
                        value={slide.featuredDish}
                        onChange={(e) => handleHeroSlideChange(idx, 'featuredDish', e.target.value)}
                        className="w-full bg-[#14151B] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:border-[#D4AF37] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
                        Featured Price
                      </label>
                      <input
                        type="text"
                        value={slide.featuredPrice}
                        onChange={(e) => handleHeroSlideChange(idx, 'featuredPrice', e.target.value)}
                        className="w-full bg-[#14151B] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:border-[#D4AF37] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1">
                      Hero Image Path / URL
                    </label>
                    <input
                      type="text"
                      value={slide.imageUrl}
                      onChange={(e) => handleHeroSlideChange(idx, 'imageUrl', e.target.value)}
                      className="w-full bg-[#14151B] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:border-[#D4AF37] focus:outline-none"
                    />
                    {slide.imageUrl && (
                      <img
                        src={slide.imageUrl}
                        alt={slide.title}
                        className="h-28 w-full object-cover rounded-xl mt-2 border border-white/10"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </form>
      )}
    </div>
  );
};
