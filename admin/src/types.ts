export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  imageUrl: string;
  alt?: string;
  featuredDish: string;
  featuredPrice?: string;
}

export interface Platter {
  id: string;
  name: string;
  urduName?: string;
  price: number;
  priceFormatted?: string;
  serves?: string;
  description: string;
  imageUrl: string;
  badge?: string;
  isPopular?: boolean;
  includes: string[];
  spiceLevel?: 'Mild' | 'Medium' | 'Authentic Spicy';
  prepTime?: string;
  isAvailable?: boolean;
  isFeatured?: boolean;
}

export interface MenuItem {
  id: string;
  name: string;
  urduName?: string;
  category: string;
  categoryLabel?: string;
  price: number;
  priceFormatted?: string;
  description: string;
  imageUrl: string;
  isAvailable?: boolean;
  isFeatured?: boolean;
  isSpecialty?: boolean;
  isBestSeller?: boolean;
  tags?: string[];
  servingSize?: string;
  ingredients?: string[];
}

export interface Review {
  id: string;
  author: string;
  location?: string;
  date?: string;
  rating: number;
  comment: string;
  dishRecommended?: string;
  avatarUrl?: string;
  isApproved?: boolean;
  isFeatured?: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'platters' | 'bbq' | 'sajji' | 'ambiance';
  categoryLabel?: string;
  imageUrl: string;
  description?: string;
}

export interface CartItem {
  item: MenuItem | Platter;
  quantity: number;
  type: 'dish' | 'platter';
}

export interface ReservationFormData {
  name: string;
  phone: string;
  guests: string;
  date: string;
  time: string;
  seatingPreference: 'family-hall' | 'main-dining' | 'vip-booth';
  specialRequests?: string;
}
