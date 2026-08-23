import React, { useState, useMemo, useEffect } from 'react';
import { Utensils, Search, Plus, Eye, AlertCircle } from 'lucide-react';
import { MENU_ITEMS } from '../data/restaurantData';
import { MenuItem } from '../types';
import menuService from '../services/menuService';

interface MenuSectionProps {
  onSelectDish: (dish: MenuItem) => void;
  onAddToCart: (dish: MenuItem) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  onSelectDish,
  onAddToCart,
}) => {
  const [itemsList, setItemsList] = useState<MenuItem[]>(MENU_ITEMS);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    let isMounted = true;
    const fetchMenuData = async () => {
      try {
        const res = await menuService.getMenuItems();
        if (isMounted && res && res.length > 0) {
          setItemsList(res);
        }
      } catch (e) {
        console.warn('[MenuSection] Using fallback static menu items');
      }
    };

    fetchMenuData();
    const timer = setInterval(fetchMenuData, 10000);
    return () => {
      isMounted = false;
      clearInterval(timer);
    };
  }, []);

  const categories = [
    { id: 'all', label: 'Full Menu', urdu: 'مکمل مینو' },
    { id: 'platters', label: 'Platters', urdu: 'شاہی پلیٹرز' },
    { id: 'bbq', label: 'BBQ & Grill', urdu: 'باربی کیو' },
    { id: 'kababs', label: 'Kababs', urdu: 'کباب' },
    { id: 'chicken', label: 'Chicken', urdu: 'چکن' },
    { id: 'mutton', label: 'Mutton', urdu: 'مٹن' },
    { id: 'rice', label: 'Rice & Pulao', urdu: 'پلاؤ اور چاول' },
    { id: 'special', label: 'Special Items', urdu: 'خصوصی آئٹمز' },
    { id: 'drinks', label: 'Drinks & Tea', urdu: 'مشروبات و قہوہ' },
  ];

  const filteredItems = useMemo(() => {
    return itemsList.filter((item) => {
      const matchesCategory =
        selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.urduName && item.urduName.includes(searchQuery));
      return matchesCategory && matchesSearch;
    });
  }, [itemsList, selectedCategory, searchQuery]);

  return (
    <section id="menu" className="py-20 sm:py-28 bg-[#0B0B0F] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181822] border border-[#D4AF37]/30 text-[#E5C058] text-xs font-bold uppercase tracking-[0.2em] mb-3">
            <Utensils className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Culinary Offerings</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-heading tracking-tight mb-4">
            Explore Our <span className="text-gold-gradient">Authentic Menu</span>
          </h2>
          <p className="text-sm sm:text-base text-[#BDB5A6] font-normal leading-relaxed">
            From hot charcoal skewers to royal family feasts, browse our complete selection of fresh, traditional Pakistani specialties.
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div className="mb-10 space-y-5">
          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#D4AF37]" />
            <input
              type="text"
              id="menu-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes (e.g. Sajji, Malai Boti, Chapli, Pulao...)"
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#14141B] border border-white/10 text-white placeholder-gray-500 text-xs sm:text-sm focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Horizontal Scrollable Category Chips */}
          <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-3 pt-1 scrollbar-none no-scrollbar">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  id={`menu-cat-btn-${cat.id}`}
                  onClick={() => setSelectedCategory(cat.id)}
                  type="button"
                  className={`px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 flex items-center gap-2 shrink-0 ${
                    isActive
                      ? 'bg-[#D4AF37] text-black shadow-lg shadow-[#D4AF37]/20 font-bold scale-[1.03]'
                      : 'bg-[#14141A] hover:bg-[#1C1C24] text-[#D1C9BE] hover:text-white border border-white/5 hover:border-white/15'
                  }`}
                >
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Menu Cards Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-[#14141B] rounded-2xl border border-white/10 max-w-lg mx-auto">
            <Utensils className="w-10 h-10 text-gray-500 mx-auto mb-3" />
            <h3 className="font-heading text-lg font-bold text-white mb-1">
              No matching items found
            </h3>
            <p className="text-xs text-gray-400 mb-4">
              Try searching with another keyword or select "Full Menu".
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-lg bg-[#D4AF37] text-black font-bold text-xs"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => {
              const isUnavailable = item.isAvailable === false;
              const imageSrc = item.imageUrl || item.image || '/assets/images/hero_bbq_platter_1787336142698.jpg';

              return (
                <div
                  key={item.id}
                  id={`menu-item-${item.id}`}
                  className={`group rounded-2xl bg-[#131319] border border-white/10 hover:border-[#D4AF37]/40 shadow-xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${
                    isUnavailable ? 'opacity-75' : ''
                  }`}
                >
                  {/* Food Image */}
                  <div className="relative h-48 overflow-hidden bg-[#181822]">
                    <img
                      src={imageSrc}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${
                        isUnavailable ? 'grayscale-[50%]' : ''
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#131319] via-transparent to-black/20" />

                    {/* Category Pill */}
                    <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded bg-black/70 backdrop-blur-sm border border-white/10 text-[10px] uppercase font-bold text-[#E5C058]">
                      {item.categoryLabel || item.category}
                    </div>

                    {/* Unavailable Badge or Price Tag */}
                    {isUnavailable ? (
                      <div className="absolute top-3 right-3 px-3 py-1 rounded-lg bg-red-900/90 border border-red-500/40 text-red-200 font-bold text-xs shadow-md flex items-center space-x-1">
                        <AlertCircle className="w-3.5 h-3.5 text-red-400" />
                        <span>Currently Unavailable</span>
                      </div>
                    ) : (
                      <div className="absolute bottom-3 right-3 px-3 py-1 rounded-lg bg-[#0D0D12]/95 border border-[#D4AF37]/40 text-[#E5C058] font-bold text-xs shadow-md">
                        {item.priceFormatted || `Rs. ${item.price.toLocaleString('en-US')}`}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-baseline justify-between gap-2 mb-1">
                        <h3 className="font-heading text-base sm:text-lg font-bold text-white group-hover:text-[#F3E5AB] transition-colors">
                          {item.name}
                        </h3>
                      </div>

                      {item.urduName && (
                        <div className="font-urdu text-xs text-[#D4AF37] mb-2 font-normal">
                          {item.urduName}
                        </div>
                      )}

                      <p className="text-xs text-[#A89E90] leading-relaxed line-clamp-2 mb-4">
                        {item.description}
                      </p>

                      {item.servingSize && (
                        <div className="text-[11px] text-[#C2B8A3] mb-3 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                          <span>Portion: {item.servingSize}</span>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="pt-3 border-t border-white/5 flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => onSelectDish(item)}
                        className="flex-1 py-2 px-3 rounded-lg bg-[#1B1B24] hover:bg-[#252532] text-xs font-semibold text-[#D6CEBF] hover:text-white transition-all flex items-center justify-center gap-1.5"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>Details</span>
                      </button>

                      {isUnavailable ? (
                        <button
                          type="button"
                          disabled
                          className="py-2 px-3 rounded-lg bg-gray-800 text-gray-500 border border-white/5 text-xs font-bold cursor-not-allowed"
                        >
                          Sold Out
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => onAddToCart(item)}
                          className="py-2 px-3 rounded-lg bg-[#D4AF37]/15 hover:bg-[#D4AF37] text-[#E5C058] hover:text-black border border-[#D4AF37]/40 text-xs font-bold transition-all flex items-center justify-center gap-1"
                          title="Add to order inquiry"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Order</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
