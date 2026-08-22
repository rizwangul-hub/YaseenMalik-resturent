import mongoose, { Document, Schema } from 'mongoose';

export interface ISettings extends Document {
  restaurantName: string;
  urduName: string;
  badge: string;
  tagline: string;
  description: string;
  phone: string;
  phoneRaw: string;
  phoneInternational: string;
  whatsapp: string;
  address: string;
  shortAddress: string;
  city: string;
  postalCode: string;
  openingHours: string;
  hoursDays: string;
  email: string;
  socialLinks: {
    tiktok: string;
    facebook: string;
    tiktokHandle?: string;
    facebookHandle?: string;
  };
  logo?: string;
  heroImages?: any[];
  aboutImage?: string;
  mapEmbedUrl: string;
  mapDirectionsUrl: string;
}

const settingsSchema = new Schema<ISettings>(
  {
    restaurantName: {
      type: String,
      default: 'Yaseen Malak Restaurant',
    },
    urduName: {
      type: String,
      default: 'یاسین ملک ریسٹورنٹ',
    },
    badge: {
      type: String,
      default: 'AUTHENTIC TASTE OF PESHAWAR',
    },
    tagline: {
      type: String,
      default: 'Where Every Bite Tells a Story',
    },
    description: {
      type: String,
      default: 'Experience delicious Pakistani BBQ, traditional platters, Balochi Sajji and flavorful dishes prepared for unforgettable dining moments.',
    },
    phone: {
      type: String,
      default: '0314 3367335',
    },
    phoneRaw: {
      type: String,
      default: '03143367335',
    },
    phoneInternational: {
      type: String,
      default: '+923143367335',
    },
    whatsapp: {
      type: String,
      default: '923143367335',
    },
    address: {
      type: String,
      default: 'Chowk, Peshawar Ring Road, Hazar Khwani, Peshawar, 25000',
    },
    shortAddress: {
      type: String,
      default: 'Hazar Khwani, Peshawar Ring Road',
    },
    city: {
      type: String,
      default: 'Peshawar, Pakistan',
    },
    postalCode: {
      type: String,
      default: '25000',
    },
    openingHours: {
      type: String,
      default: '11:00 AM – 11:00 PM',
    },
    hoursDays: {
      type: String,
      default: 'Monday – Sunday (7 Days Open)',
    },
    email: {
      type: String,
      default: 'info@yaseenmalakrestaurant.com',
    },
    socialLinks: {
      tiktok: { type: String, default: 'https://www.tiktok.com/@yaseenmalakrestaurant' },
      facebook: { type: String, default: 'https://www.facebook.com/yaseenmalakrestaurant' },
      tiktokHandle: { type: String, default: '@yaseenmalakrestaurant' },
      facebookHandle: { type: String, default: 'Yaseen Malak Restaurant Peshawar' },
    },
    logo: {
      type: String,
      default: '',
    },
    heroImages: [
      {
        type: Schema.Types.Mixed,
      },
    ],
    aboutImage: {
      type: String,
      default: '',
    },
    mapEmbedUrl: {
      type: String,
      default: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d105885.34416550787!2d71.4932087593259!3d33.97829285093766!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38d9172f3e8fdb1f%3A0x6b7720982d6b412b!2sHazar%20Khwani%2C%20Peshawar%2C%20Khyber%20Pakhtunkhwa%2C%20Pakistan!5e0!3m2!1sen!2s!4v1710000000000!5m2!1sen!2s',
    },
    mapDirectionsUrl: {
      type: String,
      default: 'https://maps.google.com/?q=Chowk+Peshawar+Ring+Road+Hazar+Khwani+Peshawar',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ISettings>('Settings', settingsSchema);
