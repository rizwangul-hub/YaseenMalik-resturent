import React, { useState, useEffect } from 'react';
import { X, Search, CheckCircle, Clock, ChefHat, CheckCheck, XCircle } from 'lucide-react';
import orderService from '../services/orderService';

interface OrderTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialOrderNumber?: string;
}

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({
  isOpen,
  onClose,
  initialOrderNumber = '',
}) => {
  const [orderNumber, setOrderNumber] = useState(initialOrderNumber);
  const [phone, setPhone] = useState('');
  const [trackedOrder, setTrackedOrder] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Auto-search if initialOrderNumber is passed
  useEffect(() => {
    if (isOpen && initialOrderNumber) {
      setOrderNumber(initialOrderNumber);
      autoTrack(initialOrderNumber);
    }
  }, [isOpen, initialOrderNumber]);

  const autoTrack = async (ordNum: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await orderService.trackOrder(ordNum, '');
      if (res && res.success && res.data) {
        setTrackedOrder(res.data);
      }
    } catch (e) {
      // ignore auto-track silent fail
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  const handleTrackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setTrackedOrder(null);

    if (!orderNumber && !phone) {
      setError('Please provide an Order Number or Phone Number.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await orderService.trackOrder(orderNumber, phone);
      if (res && res.success && res.data) {
        setTrackedOrder(res.data);
      } else {
        setError(res?.message || 'Order not found. Please check your order details.');
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Unable to track order. Please check order number.');
    } finally {
      setIsLoading(false);
    }
  };

  const steps = [
    { key: 'PENDING', label: 'Order Received', icon: Clock },
    { key: 'CONFIRMED', label: 'Order Confirmed', icon: CheckCircle },
    { key: 'IN_PREPARATION', label: 'Cooking in Kitchen', icon: ChefHat },
    { key: 'COMPLETED', label: 'Ready / Delivered', icon: CheckCheck },
  ];

  const getStepIndex = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 0;
      case 'CONFIRMED':
        return 1;
      case 'IN_PREPARATION':
        return 2;
      case 'COMPLETED':
        return 3;
      default:
        return 0;
    }
  };

  const currentStepIdx = trackedOrder ? getStepIndex(trackedOrder.status) : 0;
  const isCancelled = trackedOrder?.status === 'CANCELLED';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="bg-[#14141B] border border-[#D4AF37]/40 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl space-y-6 relative text-[#ECE7DF]">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <h2 className="text-xl font-bold font-heading text-white">
              Track Your <span className="text-gold-gradient">Order</span>
            </h2>
            <p className="text-xs text-gray-400">Yaseen Malak Live Status Tracking</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Track Form */}
        <form onSubmit={handleTrackSubmit} className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-[#D4AF37] mb-1">
              Order Number (e.g. YM-123456)
            </label>
            <input
              type="text"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value.toUpperCase())}
              placeholder="e.g. YM-123456"
              className="w-full px-3.5 py-2.5 bg-[#0B0B0E] border border-white/10 rounded-xl text-xs text-white uppercase placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1">
              Phone Number (Optional)
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. 0314 3367335"
              className="w-full px-3.5 py-2.5 bg-[#0B0B0E] border border-white/10 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-[#D4AF37] hover:bg-[#B59226] text-black font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all"
          >
            {isLoading ? 'Searching...' : 'Track Order Status'}
          </button>
        </form>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3.5 rounded-xl text-xs">
            {error}
          </div>
        )}

        {/* Tracked Order Result */}
        {trackedOrder && (
          <div className="space-y-6 pt-4 border-t border-white/10 animate-fade-in">
            <div className="flex items-center justify-between text-xs bg-white/5 p-3 rounded-xl border border-white/10">
              <div>
                <p className="font-bold text-white">{trackedOrder.customerName}</p>
                <p className="text-gray-400">Order #{trackedOrder.orderNumber}</p>
              </div>
              <div className="text-right">
                <span className="font-extrabold text-[#E5C058]">
                  Rs. {trackedOrder.total?.toLocaleString('en-US')}
                </span>
                <p className="text-[10px] text-gray-400">{trackedOrder.orderType}</p>
              </div>
            </div>

            {isCancelled ? (
              <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-2xl flex items-center space-x-3 text-red-400 text-xs">
                <XCircle className="w-6 h-6 flex-shrink-0" />
                <div>
                  <p className="font-bold text-sm">Order Cancelled</p>
                  <p>Please contact customer support at 0314 3367335 for assistance.</p>
                </div>
              </div>
            ) : (
              /* Visual Progress Steps Timeline */
              <div className="space-y-4">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Live Preparation Timeline
                </span>
                <div className="relative border-l-2 border-white/10 ml-4 space-y-6">
                  {steps.map((step, idx) => {
                    const isPassed = idx <= currentStepIdx;
                    const isCurrent = idx === currentStepIdx;
                    return (
                      <div key={step.key} className="relative pl-6">
                        <div
                          className={`absolute -left-[9px] top-0.5 w-4 h-4 rounded-full border-2 transition-colors ${
                            isPassed
                              ? 'bg-[#D4AF37] border-[#D4AF37]'
                              : 'bg-[#14141B] border-gray-600'
                          }`}
                        />
                        <div className="flex items-center space-x-2">
                          <step.icon
                            className={`w-4 h-4 ${isPassed ? 'text-[#E5C058]' : 'text-gray-500'}`}
                          />
                          <span
                            className={`text-xs font-bold ${
                              isCurrent
                                ? 'text-[#E5C058] underline underline-offset-4'
                                : isPassed
                                ? 'text-white'
                                : 'text-gray-500'
                            }`}
                          >
                            {step.label}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
