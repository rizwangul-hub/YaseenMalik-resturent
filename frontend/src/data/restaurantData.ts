import { HeroSlide, Platter, MenuItem, Review, GalleryItem } from '../types';

import hero1Img from '../assets/images/hero.jpg';
import hero2Img from '../assets/images/hero2.png';
import hero3Img from '../assets/images/hero3.webp';
import yasenLogoImg from '../assets/images/yasen.jpg';

import heroBbqPlatterImg from '../assets/images/hero_bbq_platter_1787336142698.jpg';
import heroSajjiRiceImg from '../assets/images/hero_sajji_rice_1787336159698.jpg';
import heroGrillLiveImg from '../assets/images/hero_grill_live_1787336174779.jpg';
import afghaniPlatterImg from '../assets/images/afghani_platter_1787336190758.jpg';
import chapliKababImg from '../assets/images/chapli_kabab_1787336206450.jpg';
import peshawarDiningImg from '../assets/images/peshawar_dining_1787336224131.jpg';

export { yasenLogoImg };

export const RESTAURANT_INFO = {
  name: "Yaseen Malak Restaurant",
  urduName: "یاسین ملک ریسٹورنٹ",
  badge: "AUTHENTIC TASTE OF PESHAWAR",
  tagline: "Where Every Bite Tells a Story",
  description: "Experience delicious Pakistani BBQ, traditional platters, Balochi Sajji and flavorful dishes prepared for unforgettable dining moments.",
  phone: "0314 3367335",
  phoneRaw: "03143367335",
  phoneInternational: "+923143367335",
  whatsapp: "923143367335",
  address: "Chowk, Peshawar Ring Road, Hazar Khwani, Peshawar, 25000",
  shortAddress: "Hazar Khwani, Peshawar Ring Road",
  city: "Peshawar, Pakistan",
  postalCode: "25000",
  hours: "11:00 AM – 11:00 PM",
  hoursDays: "Monday – Sunday (7 Days Open)",
  email: "info@yaseenmalakrestaurant.com",
  logoUrl: yasenLogoImg,
  social: {
    tiktok: "https://www.tiktok.com/@yaseenmalakrestaurant",
    facebook: "https://www.facebook.com/yaseenmalakrestaurant",
    tiktokHandle: "@yaseenmalakrestaurant",
    facebookHandle: "Yaseen Malak Restaurant Peshawar"
  },
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d105885.34416550787!2d71.4932087593259!3d33.97829285093766!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38d9172f3e8fdb1f%3A0x6b7720982d6b412b!2sHazar%20Khwani%2C%20Peshawar%2C%20Khyber%20Pakhtunkhwa%2C%20Pakistan!5e0!3m2!1sen!2s!4v1710000000000!5m2!1sen!2s",
  mapDirectionsUrl: "https://maps.google.com/?q=Chowk+Peshawar+Ring+Road+Hazar+Khwani+Peshawar"
};

// Hero section exclusively uses hero.jpg, hero2.png, hero3.webp
export const HERO_SLIDES: HeroSlide[] = [
  {
    id: "slide-1",
    title: "Yaseen Malak Restaurant",
    subtitle: "Where Every Bite Tells a Story",
    tagline: "AUTHENTIC TASTE OF PESHAWAR",
    imageUrl: hero1Img,
    alt: "Yaseen Malak Restaurant Hero",
    featuredDish: "Signature Balochi Platter",
    featuredPrice: "Rs. 13,400"
  },
  {
    id: "slide-2",
    title: "Golden Balochi Sajji",
    subtitle: "Slow Roasted Over Fragrant Spiced Rice",
    tagline: "TRADITIONAL CHARCOAL SPECIALTY",
    imageUrl: hero2Img,
    alt: "Golden Balochi Sajji with Rice",
    featuredDish: "Balochi Sajji with Rice",
    featuredPrice: "Rs. 1,800"
  },
  {
    id: "slide-3",
    title: "Live Peshawar Charcoal Grill",
    subtitle: "Tender Seekh Kababs & Sizzling Chapli",
    tagline: "FRESH HOT OFF THE SIZZLING EMBERS",
    imageUrl: hero3Img,
    alt: "Live Charcoal Grill",
    featuredDish: "Afghani Platter & Shinwari BBQ",
    featuredPrice: "Rs. 4,500"
  }
];

// Reset original authentic food dish photos for Platters
export const SIGNATURE_PLATTERS: Platter[] = [
  {
    id: "balochi-platter",
    name: "Balochi Platter",
    urduName: "بلوچی شاہی پلیٹر",
    price: 13400,
    priceFormatted: "Rs. 13,400",
    serves: "8 – 12 Persons",
    description: "The crown jewel of Yaseen Malak Restaurant. A mammoth royal feast featuring tender mutton, charcoal grilled birds, creamy malai boti, patta tikka, and aromatic pulao for grand family gatherings.",
    imageUrl: heroBbqPlatterImg,
    badge: "Grand Royal Feast",
    isPopular: true,
    spiceLevel: "Authentic Spicy",
    prepTime: "25-35 mins",
    includes: [
      "8 Pcs Malai Boti (Melt-in-mouth cream marinated)",
      "8 Pcs Chicken Boti (Charcoal spiced)",
      "4 Batairs (Quails marinated in Balochi herbs)",
      "2 Full Seekh Beef Tikka (Tender cuts)",
      "2 Kg Mutton (Slow-cooked charcoal Shinwari cut)",
      "2 Chicken Pcs (Golden grilled)",
      "1 Full Seekh Patta Tikka (Traditional fat-wrapped tikka)",
      "2 Pcs Chapli Kabab (Peshawari style)",
      "8 Seekh Kabab (Spiced minced beef skewers)",
      "4 Plates Sada Pulao (Long-grain fragrant rice)"
    ]
  },
  {
    id: "afghani-platter",
    name: "Afghani Platter",
    urduName: "افغانی خصوصی پلیٹر",
    price: 4500,
    priceFormatted: "Rs. 4,500",
    serves: "4 – 6 Persons",
    description: "A harmonious blend of succulent grilled poultry, fresh Bangash fish, savory beef seekh kababs, and Peshawari beef pulao. Ideal for medium families and friends.",
    imageUrl: afghaniPlatterImg,
    badge: "Most Popular",
    isPopular: true,
    spiceLevel: "Medium",
    prepTime: "20-25 mins",
    includes: [
      "6 Pcs Malai Boti (Velvety tender chicken)",
      "6 Pcs Chicken Boti (Smoky charcoal grill)",
      "Half Kg Bangash Fish (Crisp golden spiced fillet)",
      "8 Pcs Seekh Kabab (Juicy minced beef skewers)",
      "1 Plate Beef Pulao (Fragrant spiced rice with beef chunks)"
    ]
  },
  {
    id: "balochi-sajji-rice",
    name: "Balochi Sajji With Rice",
    urduName: "بلوچی سجی معہ پلاؤ چاول",
    price: 1800,
    priceFormatted: "Rs. 1,800",
    serves: "2 – 3 Persons",
    description: "Traditional Balochi style whole chicken slow-roasted on skewers around glowing embers, seasoned with coarse rock salt & carom seeds, served on a steaming bed of spiced saffron pulao rice with raisins & toasted nuts.",
    imageUrl: heroSajjiRiceImg,
    badge: "Signature Must-Try",
    isPopular: true,
    spiceLevel: "Mild",
    prepTime: "15-20 mins",
    includes: [
      "1 Whole Balochi Sajji Chicken (Crisp skin, tender meat)",
      "Large Platter Fragrant Kabuli Pulao Rice",
      "Traditional Mint & Coriander Chutney",
      "Fresh Cucumber & Onion Salad",
      "Special Zeera Raita"
    ]
  }
];

// Reset original authentic food photos for Specialties
export const SPECIALTIES_LIST: MenuItem[] = [
  {
    id: "spec-balochi-platter",
    name: "Balochi Platter",
    urduName: "بلوچی پلیٹر",
    category: "platters",
    categoryLabel: "Platters",
    price: 13400,
    priceFormatted: "Rs. 13,400",
    description: "Grand 10-item BBQ & Mutton royal platter designed for 8–12 persons.",
    imageUrl: heroBbqPlatterImg,
    isSpecialty: true,
    isBestSeller: true,
    servingSize: "8-12 Persons",
    tags: ["Signature", "Royal Feast", "Grand Family"]
  },
  {
    id: "spec-afghani-platter",
    name: "Afghani Platter",
    urduName: "افغانی پلیٹر",
    category: "platters",
    categoryLabel: "Platters",
    price: 4500,
    priceFormatted: "Rs. 4,500",
    description: "Malai boti, chicken boti, Bangash fish, seekh kababs & beef pulao.",
    imageUrl: afghaniPlatterImg,
    isSpecialty: true,
    isBestSeller: true,
    servingSize: "4-6 Persons",
    tags: ["Best Seller", "Mixed Grill", "Family Favorite"]
  },
  {
    id: "spec-balochi-sajji",
    name: "Balochi Sajji With Rice",
    urduName: "بلوچی سجی معہ چاول",
    category: "chicken",
    categoryLabel: "Special Sajji",
    price: 1800,
    priceFormatted: "Rs. 1,800",
    description: "Authentic whole rotisserie chicken seasoned with mountain rock salt on fragrant kabuli pulao.",
    imageUrl: heroSajjiRiceImg,
    isSpecialty: true,
    isBestSeller: true,
    servingSize: "2-3 Persons",
    tags: ["Traditional", "Charcoal Roasted", "Mild & Aromatic"]
  },
  {
    id: "spec-malai-boti",
    name: "Malai Boti",
    urduName: "ملائی بوٹی",
    category: "bbq",
    categoryLabel: "BBQ Grill",
    price: 950,
    priceFormatted: "Rs. 950",
    description: "Boneless chicken cubes steeped in heavy cream, green cardamom, mild white pepper, grilled gently.",
    imageUrl: heroBbqPlatterImg,
    isSpecialty: true,
    servingSize: "8 Pcs",
    tags: ["Creamy", "Melt in Mouth", "Kid Friendly"]
  },
  {
    id: "spec-chicken-boti",
    name: "Chicken Boti",
    urduName: "چکن تکہ بوٹی",
    category: "bbq",
    categoryLabel: "BBQ Grill",
    price: 750,
    priceFormatted: "Rs. 750",
    description: "Juicy marinated chicken chunks charred to perfection over burning oak charcoal.",
    imageUrl: heroGrillLiveImg,
    isSpecialty: true,
    servingSize: "8 Pcs",
    tags: ["Smoky", "Traditional BBQ"]
  },
  {
    id: "spec-seekh-kabab",
    name: "Seekh Kabab",
    urduName: "سیخ کباب",
    category: "kababs",
    categoryLabel: "Kababs",
    price: 800,
    priceFormatted: "Rs. 800",
    description: "Prime minced beef infused with crushed coriander, roasted cumin, ginger and char-broiled on flat skewers.",
    imageUrl: heroBbqPlatterImg,
    isSpecialty: true,
    servingSize: "4 Pcs",
    tags: ["Juicy", "Charcoal Broiled"]
  },
  {
    id: "spec-chapli-kabab",
    name: "Chapli Kabab",
    urduName: "پشاوری چپلی کباب",
    category: "kababs",
    categoryLabel: "Peshawari Kababs",
    price: 700,
    priceFormatted: "Rs. 700",
    description: "Legendary Peshawar-style fried minced beef patties with pomegranate seeds, coriander, and fresh tomato crowns.",
    imageUrl: chapliKababImg,
    isSpecialty: true,
    isBestSeller: true,
    servingSize: "2 Large Pcs",
    tags: ["Authentic Peshawar", "Crispy Edge", "Spicy"]
  },
  {
    id: "spec-beef-pulao",
    name: "Beef Pulao",
    urduName: "پشاوری بیف پلاؤ",
    category: "rice",
    categoryLabel: "Rice & Pulao",
    price: 850,
    priceFormatted: "Rs. 850",
    description: "Traditional Peshawari aromatic long-grain basmati simmered in bone marrow broth with tender beef shanks.",
    imageUrl: heroSajjiRiceImg,
    isSpecialty: true,
    servingSize: "1 Large Plate",
    tags: ["Marrow Broth", "Rich & Fragrant"]
  }
];

export const MENU_ITEMS: MenuItem[] = [
  ...SPECIALTIES_LIST,
  {
    id: "menu-patta-tikka",
    name: "Patta Tikka",
    urduName: "پٹہ تکہ",
    category: "mutton",
    categoryLabel: "Mutton BBQ",
    price: 1400,
    priceFormatted: "Rs. 1,400",
    description: "Authentic Khyber Pass delicacy: liver or beef cubes wrapped in delicate spiced fat and grilled over open coals.",
    imageUrl: heroGrillLiveImg,
    servingSize: "1 Full Seekh",
    tags: ["Tribal Delicacy", "Charcoal Masterpiece"]
  },
  {
    id: "menu-mutton-shinwari-karahi",
    name: "Mutton Shinwari Karahi",
    urduName: "مٹن شنواری کڑاہی",
    category: "mutton",
    categoryLabel: "Mutton Specialty",
    price: 2600,
    priceFormatted: "Rs. 2,600 / 1 Kg",
    description: "Cooked purely in animal fat with ripe tomatoes, green chillies, and rock salt. Pure unadulterated meat flavor.",
    imageUrl: peshawarDiningImg,
    servingSize: "1 Kg / 4 Persons",
    tags: ["Shinwari Style", "Salt & Tomato Base"]
  },
  {
    id: "menu-chicken-shinwari-karahi",
    name: "Chicken Shinwari Karahi",
    urduName: "چکن شنواری کڑاہی",
    category: "chicken",
    categoryLabel: "Chicken Karahi",
    price: 1500,
    priceFormatted: "Rs. 1,500 / 1 Kg",
    description: "Fresh country chicken pan-seared with ginger, green chillies and fresh garden tomatoes.",
    imageUrl: heroGrillLiveImg,
    servingSize: "1 Kg / 3-4 Persons",
    tags: ["Fresh Desi Taste"]
  },
  {
    id: "menu-bangash-fish",
    name: "Grilled Bangash Fish",
    urduName: "گرل بنگش مچھلی",
    category: "special",
    categoryLabel: "Special Items",
    price: 1600,
    priceFormatted: "Rs. 1,600",
    description: "Fresh river fish marinated in carom seeds (ajwain), lemon, and traditional Peshawari spice rub, char-grilled.",
    imageUrl: afghaniPlatterImg,
    servingSize: "Half Kg",
    tags: ["Seafood Grill", "Ajwain Spiced"]
  },
  {
    id: "menu-batair-bbq",
    name: "Grilled Batair (Quail)",
    urduName: "بٹیر باربی کیو",
    category: "special",
    categoryLabel: "Special Items",
    price: 1200,
    priceFormatted: "Rs. 1,200",
    description: "Marinated farm quails seasoned with Balochi spices and roasted till golden crisp.",
    imageUrl: heroBbqPlatterImg,
    servingSize: "4 Pcs",
    tags: ["Balochi Specialty"]
  },
  {
    id: "menu-roghni-naan",
    name: "Tandoori Roghni Naan",
    urduName: "روغنی نان",
    category: "special",
    categoryLabel: "Bread & Tandoor",
    price: 80,
    priceFormatted: "Rs. 80",
    description: "Clay-oven baked fluffy flatbread brushed with butter and sprinkled with toasted sesame seeds.",
    imageUrl: heroBbqPlatterImg,
    servingSize: "1 Pc",
    tags: ["Tandoor Fresh"]
  },
  {
    id: "menu-peshawari-qahwa",
    name: "Traditional Peshawari Qahwa",
    urduName: "پشاوری قہوہ",
    category: "drinks",
    categoryLabel: "Drinks & Tea",
    price: 80,
    priceFormatted: "Rs. 80",
    description: "Fragrant green tea brewed with green cardamom pods and served with saffron sugar crystals.",
    imageUrl: peshawarDiningImg,
    servingSize: "1 Cup",
    tags: ["Digestive", "Traditional Peshawari"]
  },
  {
    id: "menu-fresh-mint-lemonade",
    name: "Fresh Mint Lemonade & Lassi",
    urduName: "پودینہ لیمونیڈ / لسی",
    category: "drinks",
    categoryLabel: "Drinks & Beverages",
    price: 180,
    priceFormatted: "Rs. 180",
    description: "Refreshing crushed ice with mint leaves, lemon juice, or chilled sweet clay-pot lassi.",
    imageUrl: heroSajjiRiceImg,
    servingSize: "1 Tall Glass",
    tags: ["Refreshing"]
  }
];

export const WHY_CHOOSE_US = [
  {
    id: "why-1",
    icon: "Flame",
    title: "Authentic Flavors",
    urduTitle: "اصلی روایتی ذائقہ",
    description: "Handcrafted spice blends, rock-salt marinades, and time-honored Balochi and Pashtun culinary recipes passed down through generations."
  },
  {
    id: "why-2",
    icon: "Beef",
    title: "Fresh Charcoal BBQ",
    urduTitle: "تازہ کوئلہ باربی کیو",
    description: "Only 100% fresh meat prepared daily and grilled live on glowing hardwood charcoal right before your eyes."
  },
  {
    id: "why-3",
    icon: "UtensilsCrossed",
    title: "Generous Portions",
    urduTitle: "بھرپور شاہی پلیٹرز",
    description: "Our signature family platters and Sajji trays are renowned across Peshawar for their abundant size, incredible value, and rich variety."
  },
  {
    id: "why-4",
    icon: "Users",
    title: "Family Friendly",
    urduTitle: "خاندانوں کیلئے پرسکون ماحول",
    description: "Dedicated spacious family seating halls, attentive Peshawari hospitality, prompt service, and convenient parking on Ring Road."
  }
];

export const REVIEWS: Review[] = [
  {
    id: "rev-1",
    author: "Kamran Khan",
    location: "Peshawar, KP",
    date: "August 2026",
    rating: 5,
    comment: "The Balochi Platter is unbelievable! We were a group of 10 people and everyone was stuffed. The Malai Boti melted like butter and the mutton Shinwari was cooked to absolute perfection. Best BBQ on Peshawar Ring Road!",
    dishRecommended: "Balochi Platter (Rs. 13,400)",
  },
  {
    id: "rev-2",
    author: "Engr. Tariq Mehmood",
    location: "Hayatabad, Peshawar",
    date: "July 2026",
    rating: 5,
    comment: "Yaseen Malak Restaurant’s Balochi Sajji with Rice is easily the most flavorful Sajji in Hazar Khwani. The crispy skin with the aromatic kabuli rice is exceptional. Highly recommend for family dinners.",
    dishRecommended: "Balochi Sajji With Rice (Rs. 1,800)",
  },
  {
    id: "rev-3",
    author: "Zubair Afridi",
    location: "Peshawar Cantt",
    date: "August 2026",
    rating: 5,
    comment: "Ordered the Afghani Platter with Chapli Kabab. The Bangash fish was crispy and seasoned with great taste, and the beef seekh kababs were juicy without being overly greasy. Excellent hospitality.",
    dishRecommended: "Afghani Platter (Rs. 4,500)",
  },
  {
    id: "rev-4",
    author: "Dr. Ayesha Malik",
    location: "University Town, Peshawar",
    date: "June 2026",
    rating: 5,
    comment: "Very clean family dining area with warm lighting. Staff was very respectful and fast even during rush hours. The Peshawari Qahwa at the end of the feast completed the night beautifully.",
    dishRecommended: "Malai Boti & Qahwa",
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Grand Royal Balochi Platter",
    category: "platters",
    categoryLabel: "Platters",
    imageUrl: heroBbqPlatterImg,
    description: "10 signature grilled meats, quails, mutton, and kabuli pulao served in copper platters."
  },
  {
    id: "gal-2",
    title: "Crispy Sizzling Chapli Kabab",
    category: "bbq",
    categoryLabel: "BBQ & Kababs",
    imageUrl: chapliKababImg,
    description: "Fresh tomato-topped traditional Peshawari chapli kababs sizzling in hot cast-iron tawa."
  },
  {
    id: "gal-3",
    title: "Slow Roasted Balochi Sajji",
    category: "sajji",
    categoryLabel: "Sajji & Rice",
    imageUrl: heroSajjiRiceImg,
    description: "Rotisserie grilled whole chicken over aromatic basmati rice with dry fruits & almonds."
  },
  {
    id: "gal-4",
    title: "Live Glowing Charcoal Pit",
    category: "bbq",
    categoryLabel: "BBQ & Kababs",
    imageUrl: heroGrillLiveImg,
    description: "Fresh skewers of tikka and kababs over live oak charcoal fire."
  },
  {
    id: "gal-5",
    title: "Afghani Platter with Grilled Fish",
    category: "platters",
    categoryLabel: "Platters",
    imageUrl: afghaniPlatterImg,
    description: "Bangash fish, chicken boti, malai boti, seekh kabab and fragrant beef pulao."
  },
  {
    id: "gal-6",
    title: "Family Dining Hall & Atmosphere",
    category: "ambiance",
    categoryLabel: "Ambiance",
    imageUrl: peshawarDiningImg,
    description: "Spacious, comfortable family dining booths with warm ambient lighting."
  }
];
