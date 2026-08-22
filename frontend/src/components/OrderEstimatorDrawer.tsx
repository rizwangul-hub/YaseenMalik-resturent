import React from 'react';
import { X, Trash2, Plus, Minus, Phone, MessageSquare, ShoppingBag, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface OrderEstimatorDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onOpenCheckout?: () => void;
}

export const OrderEstimatorDrawer: React.FC<OrderEstimatorDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOpenCheckout,
}) => {
  if (!isOpen) return null;

  const totalAmount = cartItems.reduce((sum, item) => {
    return sum + item.item.price * item.quantity;
  }, 0);

  const formattedTotal = `Rs. ${totalAmount.toLocaleString()}`;

  const generateWhatsAppOrderLink = () => {
    if (cartItems.length === 0) return '#';
    const itemsList = cartItems
      .map(
        (ci) =>
          `• ${ci.item.name} (${ci.item.priceFormatted || `Rs. ${ci.item.price}`}) x ${ci.quantity} = Rs. ${(
            ci.item.price * ci.quantity
          ).toLocaleString()}`
      )
      .join('%0A');

    const text = `Hello Yaseen Malak Restaurant!%0A*I would like to place/inquire about an order:*%0A${itemsList}%0A%0A*Estimated Total:* ${formattedTotal}%0A%0A*Location:* Chowk, Peshawar Ring Road, Hazar Khwani.`;
    return `https://wa.me/${RESTAURANT_INFO.whatsapp}?text=${text}`;
  };

  return (
    <div
      id="order-estimator-overlay"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-[#111116] border-l border-[#D4AF37]/30 h-full flex flex-col justify-between shadow-2xl p-6 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/20 border border-[#D4AF37]/40 flex items-center justify-center text-[#E5C058]">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-heading text-lg font-bold text-white">
                  Order & Platter Inquiry
                </h3>
                <p className="text-[11px] text-[#A89E90]">
                  Calculate your feast estimate
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-gray-400 hover:text-white bg-[#1A1A24]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          {cartItems.length === 0 ? (
            <div className="text-center py-16 px-4 space-y-3">
              <ShoppingBag className="w-12 h-12 text-gray-600 mx-auto" />
              <div className="font-heading text-base font-bold text-white">
                Your order tray is empty
              </div>
              <p className="text-xs text-gray-400 max-w-xs mx-auto">
                Explore our Signature Balochi & Afghani platters or BBQ dishes and click "Order" to calculate your feast estimate.
              </p>
            </div>
          ) : (
            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between text-xs text-[#A89E90] pb-1">
                <span>Selected Items ({cartItems.length})</span>
                <button
                  type="button"
                  onClick={onClearCart}
                  className="text-red-400 hover:underline text-[11px]"
                >
                  Clear All
                </button>
              </div>

              {cartItems.map((ci) => (
                <div
                  key={ci.item.id}
                  className="p-3 rounded-xl bg-[#171720] border border-white/5 flex items-center justify-between gap-3"
                >
                  <div className="flex-1 min-w-0">
                    <div className="font-heading text-xs sm:text-sm font-bold text-white truncate">
                      {ci.item.name}
                    </div>
                    <div className="text-[11px] text-[#E5C058]">
                      Rs. {ci.item.price.toLocaleString()}
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-1.5 bg-[#0F0F14] rounded-lg p-1 border border-white/10">
                    <button
                      type="button"
                      onClick={() => onUpdateQuantity(ci.item.id, -1)}
                      className="w-6 h-6 rounded flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/10"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-5 text-center text-xs font-bold text-white">
                      {ci.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => onUpdateQuantity(ci.item.id, 1)}
                      className="w-6 h-6 rounded flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/10"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => onRemoveItem(ci.item.id)}
                    className="text-gray-500 hover:text-red-400 p-1"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Drawer Footer Checkout */}
        {cartItems.length > 0 && (
          <div className="pt-4 border-t border-white/10 space-y-4">
            <div className="flex items-baseline justify-between">
              <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">
                Subtotal
              </span>
              <span className="font-heading text-2xl font-extrabold text-[#E5C058]">
                {formattedTotal}
              </span>
            </div>

            <div className="space-y-2">
              {onOpenCheckout && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenCheckout();
                  }}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#E5C058] to-[#B8860B] hover:brightness-110 text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}

              <a
                href={generateWhatsAppOrderLink()}
                target="_blank"
                rel="noopener noreferrer"
                id="cart-whatsapp-order-btn"
                className="w-full py-3 rounded-xl bg-[#25D366] hover:bg-[#20BA5A] text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <MessageSquare className="w-4 h-4 fill-black" />
                <span>Send Order via WhatsApp</span>
              </a>
            </div>

            <p className="text-[10px] text-center text-gray-500">
              Prices in PKR. Fresh preparation on live charcoal at Peshawar Ring Road.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
