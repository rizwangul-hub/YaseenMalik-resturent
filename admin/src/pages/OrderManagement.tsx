import React, { useState, useEffect } from 'react';
import { ShoppingBag, Eye, Clock, CheckCircle2, AlertCircle, XCircle, MapPin, Phone, Mail, FileText, Truck, Store } from 'lucide-react';
import orderService from '../services/orderService';
import { useToast } from '../context/ToastContext';
import { SkeletonTable, EmptyState } from '../components/LoadingSkeleton';

export const OrderManagement: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const { showToast } = useToast();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const res = await orderService.getOrders();
      setOrders(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      showToast('Failed to load orders', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      const targetId = orderId || selectedOrder?.orderNumber;
      await orderService.updateOrderStatus(targetId, newStatus);
      showToast(`Order status updated to ${newStatus}`, 'success');
      fetchOrders();
      if (selectedOrder && (selectedOrder._id === orderId || selectedOrder.id === orderId || selectedOrder.orderNumber === orderId)) {
        setSelectedOrder({ ...selectedOrder, status: newStatus });
      }
    } catch (err) {
      showToast('Failed to update status', 'error');
    }
  };

  const filteredOrders = orders.filter((o) => (statusFilter === 'all' ? true : o.status === statusFilter));

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'CONFIRMED':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'IN_PREPARATION':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'COMPLETED':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'CANCELLED':
        return 'bg-red-500/10 text-red-400 border-red-500/20';
      default:
        return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Order Management</h1>
          <p className="text-xs text-gray-400">Track, locate, and fulfill customer food orders</p>
        </div>

        <div className="flex flex-wrap items-center bg-[#14151B] border border-white/10 p-1 rounded-xl text-xs gap-1">
          {['all', 'PENDING', 'CONFIRMED', 'IN_PREPARATION', 'COMPLETED', 'CANCELLED'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg capitalize transition-colors ${
                statusFilter === st ? 'bg-[#D4AF37] text-black font-bold' : 'text-gray-400 hover:text-white'
              }`}
            >
              {st === 'all' ? 'All Orders' : st.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <SkeletonTable />
      ) : filteredOrders.length === 0 ? (
        <EmptyState title="No Orders Found" description="Customer checkout orders will appear here." />
      ) : (
        <div className="bg-[#14151B] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/5 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                  <th className="py-3.5 px-4">Order No</th>
                  <th className="py-3.5 px-4">Customer</th>
                  <th className="py-3.5 px-4">Phone</th>
                  <th className="py-3.5 px-4">Location / Address</th>
                  <th className="py-3.5 px-4">Type</th>
                  <th className="py-3.5 px-4">Total</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm">
                {filteredOrders.map((order) => {
                  const displayId = order.orderNumber || `#${(order._id || order.id || '12345678').substring(0, 8).toUpperCase()}`;
                  return (
                    <tr key={order._id || order.id || order.orderNumber} className="hover:bg-white/5 transition-colors">
                      <td className="py-3.5 px-4 font-mono text-xs font-bold text-[#D4AF37]">
                        {displayId}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-white">{order.customerName}</td>
                      <td className="py-3.5 px-4 text-xs text-gray-300 font-mono">{order.phone}</td>
                      <td className="py-3.5 px-4 text-xs max-w-xs truncate text-gray-300">
                        {order.orderType === 'PICKUP' ? (
                          <span className="text-gray-400 italic">Self Pickup at Restaurant</span>
                        ) : (
                          <span className="flex items-center space-x-1" title={order.address}>
                            <MapPin className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                            <span className="truncate">{order.address || 'Peshawar'}</span>
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-xs">
                        <span className={`inline-flex items-center space-x-1 px-2 py-0.5 rounded-md font-semibold ${
                          order.orderType === 'DELIVERY' ? 'bg-blue-500/10 text-blue-400' : 'bg-emerald-500/10 text-emerald-400'
                        }`}>
                          {order.orderType === 'DELIVERY' ? <Truck className="w-3 h-3 mr-1" /> : <Store className="w-3 h-3 mr-1" />}
                          <span>{order.orderType || 'DELIVERY'}</span>
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-extrabold text-white">
                        Rs. {(order.total || 0).toLocaleString('en-US')}
                      </td>
                      <td className="py-3.5 px-4">
                        <select
                          value={order.status || 'PENDING'}
                          onChange={(e) => handleStatusChange(order._id || order.id || order.orderNumber, e.target.value)}
                          className={`px-2.5 py-1 rounded-full text-xs font-bold border focus:outline-none ${getStatusBadge(
                            order.status || 'PENDING'
                          )}`}
                        >
                          <option value="PENDING" className="bg-[#14151B] text-yellow-400">
                            PENDING
                          </option>
                          <option value="CONFIRMED" className="bg-[#14151B] text-blue-400">
                            CONFIRMED
                          </option>
                          <option value="IN_PREPARATION" className="bg-[#14151B] text-purple-400">
                            PREPARING
                          </option>
                          <option value="COMPLETED" className="bg-[#14151B] text-emerald-400">
                            COMPLETED
                          </option>
                          <option value="CANCELLED" className="bg-[#14151B] text-red-400">
                            CANCELLED
                          </option>
                        </select>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="p-2 rounded-lg bg-[#D4AF37]/15 hover:bg-[#D4AF37] text-[#E5C058] hover:text-black transition-colors"
                          title="View Details & Location"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Order Detail Drawer Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#14151B] border-l border-white/10 w-full max-w-md h-full p-6 overflow-y-auto space-y-6 flex flex-col justify-between shadow-2xl">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-white">Order Full Details</h3>
                  <p className="text-xs text-[#D4AF37] font-mono font-bold">
                    Order No: {selectedOrder.orderNumber || `#${(selectedOrder._id || selectedOrder.id || '123456').toUpperCase()}`}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="p-2 rounded-xl bg-white/5 text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              {/* Customer Info Card */}
              <div className="bg-white/5 rounded-2xl p-4 space-y-2 text-xs border border-white/10">
                <span className="font-bold text-[#D4AF37] uppercase tracking-wider block mb-1">
                  Customer Details
                </span>
                <p className="text-sm font-bold text-white">{selectedOrder.customerName}</p>
                <div className="flex items-center space-x-2 text-gray-300">
                  <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span className="font-mono">{selectedOrder.phone}</span>
                </div>
                {selectedOrder.email && (
                  <div className="flex items-center space-x-2 text-gray-300">
                    <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>{selectedOrder.email}</span>
                  </div>
                )}
                <p className="text-gray-400 pt-1 text-[11px]">
                  Placed on: {selectedOrder.date || 'Today'} {selectedOrder.time ? `at ${selectedOrder.time}` : ''}
                </p>
              </div>

              {/* Customer Location & Delivery Address Box */}
              <div className="bg-[#0D0E12] border border-[#D4AF37]/40 rounded-2xl p-4 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#E5C058] uppercase tracking-wider flex items-center space-x-1.5">
                    <MapPin className="w-4 h-4 text-[#D4AF37]" />
                    <span>Delivery Location / Address</span>
                  </span>
                  <span className="px-2 py-0.5 bg-[#D4AF37]/20 text-[#F3E5AB] font-bold text-[10px] rounded uppercase">
                    {selectedOrder.orderType || 'DELIVERY'}
                  </span>
                </div>

                {selectedOrder.orderType === 'PICKUP' ? (
                  <p className="text-gray-300 italic pt-1">
                    Self Pickup — Customer will pick up the order directly at Yaseen Malak Restaurant, Ring Road Peshawar.
                  </p>
                ) : (
                  <div className="space-y-1 pt-1">
                    <p className="text-sm font-bold text-white leading-relaxed">
                      {selectedOrder.address || 'No specific address provided'}
                    </p>
                    <p className="text-[11px] text-gray-400">Peshawar, KP, Pakistan</p>
                  </div>
                )}
              </div>

              {/* Order Notes / Special Requests */}
              {selectedOrder.notes && (
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-3.5 text-xs text-yellow-300 space-y-1">
                  <div className="flex items-center space-x-1.5 font-bold">
                    <FileText className="w-4 h-4" />
                    <span>Customer Special Notes:</span>
                  </div>
                  <p className="italic text-gray-200 pl-5">"{selectedOrder.notes}"</p>
                </div>
              )}

              {/* Order Items List */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Ordered Dishes & Platters
                </span>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {selectedOrder.items?.map((it: any, idx: number) => (
                    <div
                      key={idx}
                      className="bg-[#0D0E12] border border-white/5 p-3 rounded-xl flex items-center justify-between text-xs"
                    >
                      <div>
                        <p className="font-bold text-white">{it.name}</p>
                        <p className="text-gray-400">Qty: {it.quantity} × Rs. {(it.price || 0).toLocaleString('en-US')}</p>
                      </div>
                      <span className="font-bold text-[#E5C058]">
                        Rs. {((it.price || 0) * (it.quantity || 1)).toLocaleString('en-US')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary & Payment Info */}
              <div className="border-t border-white/10 pt-4 space-y-2 text-xs">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span>Rs. {(selectedOrder.subtotal || selectedOrder.total || 0).toLocaleString('en-US')}</span>
                </div>
                {selectedOrder.deliveryFee > 0 && (
                  <div className="flex justify-between text-gray-400">
                    <span>Delivery Charge</span>
                    <span>Rs. {selectedOrder.deliveryFee}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-400">
                  <span>Payment Method</span>
                  <span className="font-bold text-white">{selectedOrder.paymentMethod || 'COD'}</span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-white pt-2 border-t border-white/10">
                  <span>Total Amount</span>
                  <span className="text-[#D4AF37]">Rs. {(selectedOrder.total || 0).toLocaleString('en-US')}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <button
                onClick={() => setSelectedOrder(null)}
                className="w-full py-3 bg-white/10 hover:bg-white/20 text-white font-bold text-sm rounded-xl transition-colors"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
