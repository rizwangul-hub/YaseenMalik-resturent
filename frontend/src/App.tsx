import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Public Components
import { Navbar } from './components/Navbar';
import { HeroSlider } from './components/HeroSlider';
import { AboutSection } from './components/AboutSection';
import { SpecialtiesSection } from './components/SpecialtiesSection';
import { SignaturePlatters } from './components/SignaturePlatters';
import { MenuSection } from './components/MenuSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { FoodGallery } from './components/FoodGallery';
import { SocialSection } from './components/SocialSection';
import { ReviewsSection } from './components/ReviewsSection';
import { LocationContact } from './components/LocationContact';
import { CtaSection } from './components/CtaSection';
import { Footer } from './components/Footer';
import { DishDetailModal } from './components/DishDetailModal';
import { OrderEstimatorDrawer } from './components/OrderEstimatorDrawer';
import { OrderCheckoutModal } from './components/OrderCheckoutModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { ReservationModal } from './components/ReservationModal';
import { CartItem, MenuItem, Platter } from './types';

const PublicWebsite: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedDish, setSelectedDish] = useState<MenuItem | Platter | null>(null);
  const [isOrderDrawerOpen, setIsOrderDrawerOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [lastPlacedOrderNumber, setLastPlacedOrderNumber] = useState('');
  const [isReservationOpen, setIsReservationOpen] = useState(false);

  const handleAddToCart = (item: MenuItem | Platter) => {
    setCartItems((prev) => {
      const existing = prev.find((ci) => ci.item.id === item.id);
      if (existing) {
        return prev.map((ci) =>
          ci.item.id === item.id ? { ...ci, quantity: ci.quantity + 1 } : ci
        );
      }
      return [...prev, { item, quantity: 1, type: 'includes' in item ? 'platter' : 'dish' }];
    });
    setIsOrderDrawerOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((ci) => {
          if (ci.item.id === id) {
            const newQty = ci.quantity + delta;
            return newQty > 0 ? { ...ci, quantity: newQty } : null;
          }
          return ci;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((ci) => ci.item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleOrderSuccess = (orderNumber: string) => {
    setCartItems([]);
    setIsCheckoutOpen(false);
    setLastPlacedOrderNumber(orderNumber);
    setIsTrackingOpen(true);
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#0B0B0E] text-[#ECE7DF] flex flex-col selection:bg-[#D4AF37]/30 selection:text-[#F3E5AB]">
      <Navbar
        onOpenReservation={() => setIsReservationOpen(true)}
        onOpenOrderDrawer={() => setIsOrderDrawerOpen(true)}
        onOpenTracking={() => setIsTrackingOpen(true)}
        cartCount={totalCartCount}
      />

      <main className="flex-grow">
        <HeroSlider
          onOpenOrderDrawer={() => setIsOrderDrawerOpen(true)}
          onOpenReservation={() => setIsReservationOpen(true)}
        />
        <AboutSection onOpenReservation={() => setIsReservationOpen(true)} />
        <SpecialtiesSection
          onSelectDish={(dish) => setSelectedDish(dish)}
          onAddToCart={handleAddToCart}
        />
        <SignaturePlatters
          onSelectPlatter={(platter) => setSelectedDish(platter)}
          onAddToCart={handleAddToCart}
        />
        <MenuSection
          onSelectDish={(dish) => setSelectedDish(dish)}
          onAddToCart={handleAddToCart}
        />
        <WhyChooseUs />
        <FoodGallery />
        <SocialSection />
        <ReviewsSection />
        <LocationContact />
        <CtaSection />
      </main>

      <Footer />

      <DishDetailModal
        item={selectedDish}
        onClose={() => setSelectedDish(null)}
        onAddToCart={handleAddToCart}
      />

      <OrderEstimatorDrawer
        isOpen={isOrderDrawerOpen}
        onClose={() => setIsOrderDrawerOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onOpenCheckout={() => setIsCheckoutOpen(true)}
      />

      <OrderCheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        onSuccess={handleOrderSuccess}
      />

      <OrderTrackingModal
        isOpen={isTrackingOpen}
        onClose={() => setIsTrackingOpen(false)}
        initialOrderNumber={lastPlacedOrderNumber}
      />

      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicWebsite />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
