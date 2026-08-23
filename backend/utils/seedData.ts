import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from '../models/User.js';
import Category from '../models/Category.js';
import MenuItem from '../models/MenuItem.js';
import Platter from '../models/Platter.js';
import Gallery from '../models/Gallery.js';
import Review from '../models/Review.js';
import Settings from '../models/Settings.js';
import { connectDB } from '../config/db.js';

dotenv.config();

const seed = async () => {
  try {
    await connectDB();

    if (mongoose.connection.readyState !== 1) {
      console.log('--------------------------------------------------');
      console.log('[Seed Warning]: MongoDB is not currently connected.');
      console.log('To seed database records:');
      console.log('1. Start your local MongoDB server (mongod), OR');
      console.log('2. Provide a valid MONGO_URI in your .env file (e.g. MongoDB Atlas).');
      console.log('3. Run `npm run seed` again.');
      console.log('--------------------------------------------------');
      process.exit(0);
      return;
    }

    console.log('[Seed] Connected to database for seeding...');

    // 1. Seed Admin User
    const adminExists = await User.findOne({ email: 'admin@yaseenmalakrestaurant.com' });
    if (!adminExists) {
      await User.create({
        name: 'Super Admin',
        email: 'admin@yaseenmalakrestaurant.com',
        password: 'Admin@123456',
        role: 'SUPER_ADMIN',
        isActive: true,
      });
      console.log('[Seed] Admin user created: admin@yaseenmalakrestaurant.com / Admin@123456');
    } else {
      console.log('[Seed] Admin user already exists.');
    }

    // 2. Seed Restaurant Settings
    await Settings.deleteMany({});
    await Settings.create({
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
    console.log('[Seed] Settings seeded.');

    // 3. Seed Platters
    await Platter.deleteMany({});
    await Platter.create([
      {
        name: 'Balochi Platter',
        slug: 'balochi-platter',
        urduName: 'بلوچی شاہی پلیٹر',
        price: 13400,
        priceFormatted: 'Rs. 13,400',
        serves: '8 – 12 Persons',
        description: 'The crown jewel of Yaseen Malak Restaurant. A mammoth royal feast featuring tender mutton, charcoal grilled birds, creamy malai boti, patta tikka, and aromatic pulao for grand family gatherings.',
        image: '/assets/images/hero_bbq_platter_1787336142698.jpg',
        badge: 'Grand Royal Feast',
        isPopular: true,
        spiceLevel: 'Authentic Spicy',
        prepTime: '25-35 mins',
        includes: [
          '8 Pcs Malai Boti (Melt-in-mouth cream marinated)',
          '8 Pcs Chicken Boti (Charcoal spiced)',
          '4 Batairs (Quails marinated in Balochi herbs)',
          '2 Full Seekh Beef Tikka (Tender cuts)',
          '2 Kg Mutton (Slow-cooked charcoal Shinwari cut)',
          '2 Chicken Pcs (Golden grilled)',
          '1 Full Seekh Patta Tikka (Traditional fat-wrapped tikka)',
          '2 Pcs Chapli Kabab (Peshawari style)',
          '8 Seekh Kabab (Spiced minced beef skewers)',
          '4 Plates Sada Pulao (Long-grain fragrant rice)',
        ],
        isFeatured: true,
        isAvailable: true,
        sortOrder: 1,
      },
      {
        name: 'Afghani Platter',
        slug: 'afghani-platter',
        urduName: 'افغانی خصوصی پلیٹر',
        price: 4500,
        priceFormatted: 'Rs. 4,500',
        serves: '4 – 6 Persons',
        description: 'A harmonious blend of succulent grilled poultry, fresh Bangash fish, savory beef seekh kababs, and Peshawari beef pulao. Ideal for medium families and friends.',
        image: '/assets/images/afghani_platter_1787336190758.jpg',
        badge: 'Most Popular',
        isPopular: true,
        spiceLevel: 'Medium',
        prepTime: '20-25 mins',
        includes: [
          '6 Pcs Malai Boti (Velvety tender chicken)',
          '6 Pcs Chicken Boti (Smoky charcoal grill)',
          'Half Kg Bangash Fish (Crisp golden spiced fillet)',
          '8 Pcs Seekh Kabab (Juicy minced beef skewers)',
          '1 Plate Beef Pulao (Fragrant spiced rice with beef chunks)',
        ],
        isFeatured: true,
        isAvailable: true,
        sortOrder: 2,
      },
      {
        name: 'Balochi Sajji With Rice',
        slug: 'balochi-sajji-rice',
        urduName: 'بلوچی سجی معہ پلاؤ چاول',
        price: 1800,
        priceFormatted: 'Rs. 1,800',
        serves: '2 – 3 Persons',
        description: 'Traditional Balochi style whole chicken slow-roasted on skewers around glowing embers, seasoned with coarse rock salt & carom seeds, served on a steaming bed of spiced saffron pulao rice with raisins & toasted nuts.',
        image: '/assets/images/hero_sajji_rice_1787336159698.jpg',
        badge: 'Signature Must-Try',
        isPopular: true,
        spiceLevel: 'Mild',
        prepTime: '15-20 mins',
        includes: [
          '1 Whole Balochi Sajji Chicken (Crisp skin, tender meat)',
          'Large Platter Fragrant Kabuli Pulao Rice',
          'Traditional Mint & Coriander Chutney',
          'Fresh Cucumber & Onion Salad',
          'Special Zeera Raita',
        ],
        isFeatured: true,
        isAvailable: true,
        sortOrder: 3,
      },
    ]);
    console.log('[Seed] Platters seeded.');

    // 4. Seed Categories
    await Category.deleteMany({});
    await Category.create([
      { name: 'BBQ Grill', slug: 'bbq', description: 'Charcoal grilled kebabs & botis', sortOrder: 1 },
      { name: 'Special Sajji', slug: 'chicken', description: 'Balochi Sajji & Chicken specialties', sortOrder: 2 },
      { name: 'Kababs', slug: 'kababs', description: 'Seekh & Chapli Kababs', sortOrder: 3 },
      { name: 'Mutton Specialty', slug: 'mutton', description: 'Shinwari Mutton Karahi & Patta Tikka', sortOrder: 4 },
      { name: 'Rice & Pulao', slug: 'rice', description: 'Peshawari Beef Pulao & Basmati Rice', sortOrder: 5 },
      { name: 'Platters', slug: 'platters', description: 'Royal Signature Platters', sortOrder: 6 },
      { name: 'Special Items', slug: 'special', description: 'Bangash Fish & Batair', sortOrder: 7 },
      { name: 'Drinks & Tea', slug: 'drinks', description: 'Peshawari Qahwa & Refreshing Drinks', sortOrder: 8 },
    ]);
    console.log('[Seed] Categories seeded.');

    // 5. Seed Menu Items
    await MenuItem.deleteMany({});
    await MenuItem.create([
      {
        name: 'Balochi Platter',
        slug: 'spec-balochi-platter',
        urduName: 'بلوچی پلیٹر',
        category: 'platters',
        categoryLabel: 'Platters',
        price: 13400,
        priceFormatted: 'Rs. 13,400',
        description: 'Grand 10-item BBQ & Mutton royal platter designed for 8–12 persons.',
        image: '/assets/images/hero_bbq_platter_1787336142698.jpg',
        isSpecialty: true,
        isBestSeller: true,
        servingSize: '8-12 Persons',
        tags: ['Signature', 'Royal Feast', 'Grand Family'],
        sortOrder: 1,
      },
      {
        name: 'Afghani Platter',
        slug: 'spec-afghani-platter',
        urduName: 'افغانی پلیٹر',
        category: 'platters',
        categoryLabel: 'Platters',
        price: 4500,
        priceFormatted: 'Rs. 4,500',
        description: 'Malai boti, chicken boti, Bangash fish, seekh kababs & beef pulao.',
        image: '/assets/images/afghani_platter_1787336190758.jpg',
        isSpecialty: true,
        isBestSeller: true,
        servingSize: '4-6 Persons',
        tags: ['Best Seller', 'Mixed Grill', 'Family Favorite'],
        sortOrder: 2,
      },
      {
        name: 'Balochi Sajji With Rice',
        slug: 'spec-balochi-sajji',
        urduName: 'بلوچی سجی معہ چاول',
        category: 'chicken',
        categoryLabel: 'Special Sajji',
        price: 1800,
        priceFormatted: 'Rs. 1,800',
        description: 'Authentic whole rotisserie chicken seasoned with mountain rock salt on fragrant kabuli pulao.',
        image: '/assets/images/hero_sajji_rice_1787336159698.jpg',
        isSpecialty: true,
        isBestSeller: true,
        servingSize: '2-3 Persons',
        tags: ['Traditional', 'Charcoal Roasted', 'Mild & Aromatic'],
        sortOrder: 3,
      },
      {
        name: 'Malai Boti',
        slug: 'spec-malai-boti',
        urduName: 'ملائی بوٹی',
        category: 'bbq',
        categoryLabel: 'BBQ Grill',
        price: 950,
        priceFormatted: 'Rs. 950',
        description: 'Boneless chicken cubes steeped in heavy cream, green cardamom, mild white pepper, grilled gently.',
        image: '/assets/images/hero_bbq_platter_1787336142698.jpg',
        isSpecialty: true,
        servingSize: '8 Pcs',
        tags: ['Creamy', 'Melt in Mouth', 'Kid Friendly'],
        sortOrder: 4,
      },
      {
        name: 'Chicken Boti',
        slug: 'spec-chicken-boti',
        urduName: 'چکن تکہ بوٹی',
        category: 'bbq',
        categoryLabel: 'BBQ Grill',
        price: 750,
        priceFormatted: 'Rs. 750',
        description: 'Juicy marinated chicken chunks charred to perfection over burning oak charcoal.',
        image: '/assets/images/hero_grill_live_1787336174779.jpg',
        isSpecialty: true,
        servingSize: '8 Pcs',
        tags: ['Smoky', 'Traditional BBQ'],
        sortOrder: 5,
      },
      {
        name: 'Seekh Kabab',
        slug: 'spec-seekh-kabab',
        urduName: 'سیخ کباب',
        category: 'kababs',
        categoryLabel: 'Kababs',
        price: 800,
        priceFormatted: 'Rs. 800',
        description: 'Prime minced beef infused with crushed coriander, roasted cumin, ginger and char-broiled on flat skewers.',
        image: '/assets/images/hero_bbq_platter_1787336142698.jpg',
        isSpecialty: true,
        servingSize: '4 Pcs',
        tags: ['Juicy', 'Charcoal Broiled'],
        sortOrder: 6,
      },
      {
        name: 'Chapli Kabab',
        slug: 'spec-chapli-kabab',
        urduName: 'پشاوری چپلی کباب',
        category: 'kababs',
        categoryLabel: 'Peshawari Kababs',
        price: 700,
        priceFormatted: 'Rs. 700',
        description: 'Legendary Peshawar-style fried minced beef patties with pomegranate seeds, coriander, and fresh tomato crowns.',
        image: '/assets/images/chapli_kabab_1787336206450.jpg',
        isSpecialty: true,
        isBestSeller: true,
        servingSize: '2 Large Pcs',
        tags: ['Authentic Peshawar', 'Crispy Edge', 'Spicy'],
        sortOrder: 7,
      },
      {
        name: 'Beef Pulao',
        slug: 'spec-beef-pulao',
        urduName: 'پشاوری بیف پلاؤ',
        category: 'rice',
        categoryLabel: 'Rice & Pulao',
        price: 850,
        priceFormatted: 'Rs. 850',
        description: 'Traditional Peshawari aromatic long-grain basmati simmered in bone marrow broth with tender beef shanks.',
        image: '/assets/images/hero_sajji_rice_1787336159698.jpg',
        isSpecialty: true,
        servingSize: '1 Large Plate',
        tags: ['Marrow Broth', 'Rich & Fragrant'],
        sortOrder: 8,
      },
      {
        name: 'Patta Tikka',
        slug: 'menu-patta-tikka',
        urduName: 'پٹہ تکہ',
        category: 'mutton',
        categoryLabel: 'Mutton BBQ',
        price: 1400,
        priceFormatted: 'Rs. 1,400',
        description: 'Authentic Khyber Pass delicacy: liver or beef cubes wrapped in delicate spiced fat and grilled over open coals.',
        image: '/assets/images/hero_grill_live_1787336174779.jpg',
        servingSize: '1 Full Seekh',
        tags: ['Tribal Delicacy', 'Charcoal Masterpiece'],
        sortOrder: 9,
      },
      {
        name: 'Mutton Shinwari Karahi',
        slug: 'menu-mutton-shinwari-karahi',
        urduName: 'مٹن شنواری کڑاہی',
        category: 'mutton',
        categoryLabel: 'Mutton Specialty',
        price: 2600,
        priceFormatted: 'Rs. 2,600 / 1 Kg',
        description: 'Cooked purely in animal fat with ripe tomatoes, green chillies, and rock salt. Pure unadulterated meat flavor.',
        image: '/assets/images/peshawar_dining_1787336224131.jpg',
        servingSize: '1 Kg / 4 Persons',
        tags: ['Shinwari Style', 'Salt & Tomato Base'],
        sortOrder: 10,
      },
      {
        name: 'Chicken Shinwari Karahi',
        slug: 'menu-chicken-shinwari-karahi',
        urduName: 'چکن شنواری کڑاہی',
        category: 'chicken',
        categoryLabel: 'Chicken Karahi',
        price: 1500,
        priceFormatted: 'Rs. 1,500 / 1 Kg',
        description: 'Fresh country chicken pan-seared with ginger, green chillies and fresh garden tomatoes.',
        image: '/assets/images/hero_grill_live_1787336174779.jpg',
        servingSize: '1 Kg / 3-4 Persons',
        tags: ['Fresh Desi Taste'],
        sortOrder: 11,
      },
      {
        name: 'Grilled Bangash Fish',
        slug: 'menu-bangash-fish',
        urduName: 'گرل بنگش مچھلی',
        category: 'special',
        categoryLabel: 'Special Items',
        price: 1600,
        priceFormatted: 'Rs. 1,600',
        description: 'Fresh river fish marinated in carom seeds (ajwain), lemon, and traditional Peshawari spice rub, char-grilled.',
        image: '/assets/images/afghani_platter_1787336190758.jpg',
        servingSize: 'Half Kg',
        tags: ['Seafood Grill', 'Ajwain Spiced'],
        sortOrder: 12,
      },
      {
        name: 'Grilled Batair (Quail)',
        slug: 'menu-batair-bbq',
        urduName: 'بٹیر باربی کیو',
        category: 'special',
        categoryLabel: 'Special Items',
        price: 1200,
        priceFormatted: 'Rs. 1,200',
        description: 'Marinated farm quails seasoned with Balochi spices and roasted till golden crisp.',
        image: '/assets/images/hero_bbq_platter_1787336142698.jpg',
        servingSize: '4 Pcs',
        tags: ['Balochi Specialty'],
        sortOrder: 13,
      },
      {
        name: 'Tandoori Roghni Naan',
        slug: 'menu-roghni-naan',
        urduName: 'روغنی نان',
        category: 'special',
        categoryLabel: 'Bread & Tandoor',
        price: 80,
        priceFormatted: 'Rs. 80',
        description: 'Clay-oven baked fluffy flatbread brushed with butter and sprinkled with toasted sesame seeds.',
        image: '/assets/images/hero_bbq_platter_1787336142698.jpg',
        servingSize: '1 Pc',
        tags: ['Tandoor Fresh'],
        sortOrder: 14,
      },
      {
        name: 'Traditional Peshawari Qahwa',
        slug: 'menu-peshawari-qahwa',
        urduName: 'پشاوری قہوہ',
        category: 'drinks',
        categoryLabel: 'Drinks & Tea',
        price: 80,
        priceFormatted: 'Rs. 80',
        description: 'Fragrant green tea brewed with green cardamom pods and served with saffron sugar crystals.',
        image: '/assets/images/peshawar_dining_1787336224131.jpg',
        servingSize: '1 Cup',
        tags: ['Digestive', 'Traditional Peshawari'],
        sortOrder: 15,
      },
      {
        name: 'Fresh Mint Lemonade & Lassi',
        slug: 'menu-fresh-mint-lemonade',
        urduName: 'پودینہ لیمونیڈ / لسی',
        category: 'drinks',
        categoryLabel: 'Drinks & Beverages',
        price: 180,
        priceFormatted: 'Rs. 180',
        description: 'Refreshing crushed ice with mint leaves, lemon juice, or chilled sweet clay-pot lassi.',
        image: '/assets/images/hero_sajji_rice_1787336159698.jpg',
        servingSize: '1 Tall Glass',
        tags: ['Refreshing'],
        sortOrder: 16,
      },
    ]);
    console.log('[Seed] Menu items seeded.');

    // 6. Seed Gallery
    await Gallery.deleteMany({});
    await Gallery.create([
      {
        title: 'Grand Royal Balochi Platter',
        category: 'platters',
        categoryLabel: 'Platters',
        image: '/assets/images/hero_bbq_platter_1787336142698.jpg',
        description: '10 signature grilled meats, quails, mutton, and kabuli pulao served in copper platters.',
        sortOrder: 1,
      },
      {
        title: 'Crispy Sizzling Chapli Kabab',
        category: 'bbq',
        categoryLabel: 'BBQ & Kababs',
        image: '/assets/images/chapli_kabab_1787336206450.jpg',
        description: 'Fresh tomato-topped traditional Peshawari chapli kababs sizzling in hot cast-iron tawa.',
        sortOrder: 2,
      },
      {
        title: 'Slow Roasted Balochi Sajji',
        category: 'sajji',
        categoryLabel: 'Sajji & Rice',
        image: '/assets/images/hero_sajji_rice_1787336159698.jpg',
        description: 'Rotisserie grilled whole chicken over aromatic basmati rice with dry fruits & almonds.',
        sortOrder: 3,
      },
      {
        title: 'Live Glowing Charcoal Pit',
        category: 'bbq',
        categoryLabel: 'BBQ & Kababs',
        image: '/assets/images/hero_grill_live_1787336174779.jpg',
        description: 'Fresh skewers of tikka and kababs over live oak charcoal fire.',
        sortOrder: 4,
      },
      {
        title: 'Afghani Platter with Grilled Fish',
        category: 'platters',
        categoryLabel: 'Platters',
        image: '/assets/images/afghani_platter_1787336190758.jpg',
        description: 'Bangash fish, chicken boti, malai boti, seekh kabab and fragrant beef pulao.',
        sortOrder: 5,
      },
      {
        title: 'Family Dining Hall & Atmosphere',
        category: 'ambiance',
        categoryLabel: 'Ambiance',
        image: '/assets/images/peshawar_dining_1787336224131.jpg',
        description: 'Spacious, comfortable family dining booths with warm ambient lighting.',
        sortOrder: 6,
      },
    ]);
    console.log('[Seed] Gallery seeded.');

    // 7. Seed Reviews
    await Review.deleteMany({});
    await Review.create([
      {
        customerName: 'Kamran Khan',
        author: 'Kamran Khan',
        location: 'Peshawar, KP',
        rating: 5,
        review: 'The Balochi Platter is unbelievable! We were a group of 10 people and everyone was stuffed. The Malai Boti melted like butter and the mutton Shinwari was cooked to absolute perfection. Best BBQ on Peshawar Ring Road!',
        comment: 'The Balochi Platter is unbelievable! We were a group of 10 people and everyone was stuffed. The Malai Boti melted like butter and the mutton Shinwari was cooked to absolute perfection. Best BBQ on Peshawar Ring Road!',
        dishRecommended: 'Balochi Platter (Rs. 13,400)',
        isApproved: true,
      },
      {
        customerName: 'Engr. Tariq Mehmood',
        author: 'Engr. Tariq Mehmood',
        location: 'Hayatabad, Peshawar',
        rating: 5,
        review: 'Yaseen Malak Restaurant’s Balochi Sajji with Rice is easily the most flavorful Sajji in Hazar Khwani. The crispy skin with the aromatic kabuli rice is exceptional. Highly recommend for family dinners.',
        comment: 'Yaseen Malak Restaurant’s Balochi Sajji with Rice is easily the most flavorful Sajji in Hazar Khwani. The crispy skin with the aromatic kabuli rice is exceptional. Highly recommend for family dinners.',
        dishRecommended: 'Balochi Sajji With Rice (Rs. 1,800)',
        isApproved: true,
      },
      {
        customerName: 'Zubair Afridi',
        author: 'Zubair Afridi',
        location: 'Peshawar Cantt',
        rating: 5,
        review: 'Ordered the Afghani Platter with Chapli Kabab. The Bangash fish was crispy and seasoned with great taste, and the beef seekh kababs were juicy without being overly greasy. Excellent hospitality.',
        comment: 'Ordered the Afghani Platter with Chapli Kabab. The Bangash fish was crispy and seasoned with great taste, and the beef seekh kababs were juicy without being overly greasy. Excellent hospitality.',
        dishRecommended: 'Afghani Platter (Rs. 4,500)',
        isApproved: true,
      },
      {
        customerName: 'Dr. Ayesha Malik',
        author: 'Dr. Ayesha Malik',
        location: 'University Town, Peshawar',
        rating: 5,
        review: 'Very clean family dining area with warm lighting. Staff was very respectful and fast even during rush hours. The Peshawari Qahwa at the end of the feast completed the night beautifully.',
        comment: 'Very clean family dining area with warm lighting. Staff was very respectful and fast even during rush hours. The Peshawari Qahwa at the end of the feast completed the night beautifully.',
        dishRecommended: 'Malai Boti & Qahwa',
        isApproved: true,
      },
    ]);
    console.log('[Seed] Reviews seeded.');

    console.log('[Seed] Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('[Seed Error]:', error);
    process.exit(1);
  }
};

seed();
