import React, { useState } from 'react';
import { X, CheckCircle, Truck, Store, CreditCard, ShieldCheck, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';
import orderService from '../services/orderService';

interface OrderCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onSuccess: (orderNumber: string) => void;
}

export const OrderCheckoutModal: React.FC<OrderCheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onSuccess,
}) => {
  const [orderType, setOrderType] = useState<'DELIVERY' | 'PICKUP'>('DELIVERY');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'PICKUP'>('COD');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [completedOrderNumber, setCompletedOrderNumber] = useState<string | null>(null);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((sum, ci) => sum + ci.item.price * ci.quantity, 0);
  const deliveryFee = orderType === 'DELIVERY' ? 150 : 0;
  const grandTotal = subtotal + deliveryFee;

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!customerName || !phone) {
      setError('Please provide your full name and phone number.');
      return;
    }

    if (orderType === 'DELIVERY' && (!address || address.trim() === '')) {
      setError('Please provide a complete delivery address.');
      return;
    }

    setIsSubmitting(true);
    try {
      const itemsPayload = cartItems.map((ci) => ({
        itemId: ci.item.id,
        name: ci.item.name,
        price: ci.item.price,
        quantity: ci.quantity,
        type: ci.type,
      }));

      const res = await orderService.createOrder({
        customerName,
        phone,
        email,
        address: orderType === 'DELIVERY' ? address : '',
        orderType,
        items: itemsPayload,
        notes,
        paymentMethod: orderType === 'DELIVERY' ? 'COD' : 'PICKUP',
      });

      if (res && res.success && res.data) {
        setCompletedOrderNumber(res.data.orderNumber);
      } else {
        setError(res?.message || 'Failed to place order. Please try again.');
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || err?.message || 'Error processing your order.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFinishSuccess = () => {
    if (completedOrderNumber) {
      onSuccess(completedOrderNumber);
    }
    setCompletedOrderNumber(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="bg-[#14141B] border border-[#D4AF37]/40 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6 relative my-8 max-h-[90vh] overflow-y-auto text-[#ECE7DF]">
        
        {/* SUCCESS SCREEN */}
        {completedOrderNumber ? (
          <div className="text-center space-y-5 py-4 animate-fade-in">
            <div className="w-16 h-16 bg-emerald-500/20 border-2 border-emerald-500 rounded-full flex items-center justify-center mx-auto text-emerald-400 shadow-lg shadow-emerald-500/20">
              <CheckCircle className="w-10 h-10" />
            </div>

            <div>
              <h2 className="text-2xl font-bold font-heading text-white">Order Placed Successfully!</h2>
              <p className="text-xs text-gray-400 mt-1">Thank you for dining with Yaseen Malak Restaurant</p>
            </div>

            {/* Display Order Number Prominently */}
            <div className="p-4 bg-[#0B0B0E] border border-[#D4AF37]/50 rounded-2xl space-y-1">
              <span className="text-[11px] uppercase tracking-widest text-gray-400">Your Order Number</span>
              <div className="text-3xl font-extrabold text-[#E5C058] tracking-wider font-mono">
                {completedOrderNumber}
              </div>
              <p className="text-[11px] text-emerald-400 font-medium pt-1">
                Estimated Time: {orderType === 'DELIVERY' ? '30 – 40 mins Delivery' : '15 – 25 mins Pickup'}
              </p>
            </div>

            {/* Order Brief Summary */}
            <div className="p-3.5 bg-white/5 rounded-xl border border-white/10 text-xs text-left space-y-1.5 text-gray-300">
              <div className="flex justify-between">
                <span>Customer:</span>
                <span className="font-bold text-white">{customerName} ({phone})</span>
              </div>
              <div className="flex justify-between">
                <span>Order Type:</span>
                <span className="font-bold text-[#E5C058]">{orderType}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Amount:</span>
                <span className="font-bold text-white">Rs. {grandTotal.toLocaleString('en-US')}</span>
              </div>
            </div>

            <div className="pt-2 space-y-2">
              <button
                type="button"
                onClick={handleFinishSuccess}
                className="w-full py-3.5 bg-gradient-to-r from-[#D4AF37] via-[#E5C058] to-[#B8860B] text-black font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-xl flex items-center justify-center space-x-2"
              >
                <span>Track Live Order Status</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* CHECKOUT FORM SCREEN */
          <>
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold font-heading text-white">
                  Complete Your <span className="text-gold-gradient">Order</span>
                </h2>
                <p className="text-xs text-gray-400">Yaseen Malak Restaurant • Peshawar Ring Road</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3.5 rounded-xl text-xs">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmitOrder} className="space-y-4">
              {/* Order Type Toggle */}
              <div className="grid grid-cols-2 gap-3 p-1 bg-[#0B0B0E] border border-white/10 rounded-2xl">
                <button
                  type="button"
                  onClick={() => {
                    setOrderType('DELIVERY');
                    setPaymentMethod('COD');
                  }}
                  className={`py-2.5 rounded-xl text-xs font-bold flex items-center justify-center space-x-2 transition-all ${
                    orderType === 'DELIVERY'
                      ? 'bg-[#D4AF37] text-black shadow-lg'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Truck className="w-4 h-4" />
                  <span>Home Delivery</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setOrderType('PICKUP');
                    setPaymentMethod('PICKUP');
                  }}
                  className={`py-2.5 rounded-xl text-xs font-bold flex items-center justify-center space-x-2 transition-all ${
                    orderType === 'PICKUP'
                      ? 'bg-[#D4AF37] text-black shadow-lg'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Store className="w-4 h-4" />
                  <span>Self Pickup</span>
                </button>
              </div>

              {/* Customer Inputs */}
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-[#D4AF37] mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Tariq Mehmood"
                    className="w-full px-3.5 py-2.5 bg-[#0B0B0E] border border-white/10 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#D4AF37] mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="0314 3367335"
                      className="w-full px-3.5 py-2.5 bg-[#0B0B0E] border border-white/10 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1">
                      Email (Optional)
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="email@example.com"
                      className="w-full px-3.5 py-2.5 bg-[#0B0B0E] border border-white/10 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                {orderType === 'DELIVERY' && (
                  <div>
                    <label className="block text-xs font-semibold text-[#D4AF37] mb-1">
                      Delivery Address *
                    </label>
                    <textarea
                      rows={2}
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Street, House No, Sector or Landmark in Peshawar..."
                      className="w-full px-3.5 py-2.5 bg-[#0B0B0E] border border-white/10 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">
                    Order Notes / Special Requests
                  </label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Extra raita, mild spice..."
                    className="w-full px-3.5 py-2.5 bg-[#0B0B0E] border border-white/10 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              {/* Payment Method Badge */}
              <div className="p-3 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                  <span>Payment Option:</span>
                </div>
                <span className="font-bold text-[#E5C058]">
                  {orderType === 'DELIVERY' ? 'Cash on Delivery (COD)' : 'Pay at Counter / Pickup'}
                </span>
              </div>

              {/* Summary */}
              <div className="border-t border-white/10 pt-4 space-y-1.5 text-xs">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span>Rs. {subtotal.toLocaleString('en-US')}</span>
                </div>
                {orderType === 'DELIVERY' && (
                  <div className="flex justify-between text-gray-400">
                    <span>Delivery Charge</span>
                    <span>Rs. {deliveryFee}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-extrabold text-white pt-2 border-t border-white/10">
                  <span>Grand Total</span>
                  <span className="text-[#E5C058]">Rs. {grandTotal.toLocaleString('en-US')}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-gradient-to-r from-[#D4AF37] via-[#E5C058] to-[#B8860B] hover:brightness-110 text-black font-extrabold text-sm uppercase tracking-wider rounded-xl shadow-xl transition-all disabled:opacity-50"
              >
                {isSubmitting ? 'Placing Order...' : 'Place Order Now'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
