import React, { useState, useEffect } from 'react';
import { Users, Search } from 'lucide-react';
import orderService from '../services/orderService';
import reservationService from '../services/reservationService';
import { SkeletonTable, EmptyState } from '../components/LoadingSkeleton';

export const CustomerManagement: React.FC = () => {
  const [customers, setCustomers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    setIsLoading(true);
    try {
      const [ordersRes, reservationsRes] = await Promise.all([
        orderService.getOrders().catch(() => ({ data: [] })),
        reservationService.getReservations().catch(() => ({ data: [] })),
      ]);

      const ordersList = Array.isArray(ordersRes.data) ? ordersRes.data : [];
      const reservationsList = Array.isArray(reservationsRes.data) ? reservationsRes.data : [];

      const customerMap = new Map<string, any>();

      ordersList.forEach((o: any) => {
        const key = o.phone || o.customerName;
        if (!customerMap.has(key)) {
          customerMap.set(key, {
            name: o.customerName,
            phone: o.phone,
            email: o.email || 'N/A',
            orderCount: 1,
            totalSpend: o.total || 0,
            lastOrder: o.date || new Date().toISOString().split('T')[0],
          });
        } else {
          const existing = customerMap.get(key);
          existing.orderCount += 1;
          existing.totalSpend += o.total || 0;
        }
      });

      reservationsList.forEach((r: any) => {
        const key = r.phone || r.customerName;
        if (!customerMap.has(key)) {
          customerMap.set(key, {
            name: r.customerName,
            phone: r.phone,
            email: r.email || 'N/A',
            orderCount: 0,
            totalSpend: 0,
            lastOrder: r.date || new Date().toISOString().split('T')[0],
          });
        }
      });

      setCustomers(Array.from(customerMap.values()));
    } catch (err) {
      console.warn('[CustomerManagement] Error loading customer data');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredCustomers = customers.filter(
    (c) => c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.phone.includes(searchTerm)
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Customer Relationship Directory</h1>
          <p className="text-xs text-gray-400">Aggregated customer records from orders & table bookings</p>
        </div>
      </div>

      <div className="bg-[#14151B] border border-white/10 p-4 rounded-2xl">
        <div className="relative max-w-xs">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search customer name or phone..."
            className="w-full bg-[#0D0E12] border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]"
          />
        </div>
      </div>

      {isLoading ? (
        <SkeletonTable />
      ) : filteredCustomers.length === 0 ? (
        <EmptyState title="No Customers Found" description="Customer records will accumulate automatically." />
      ) : (
        <div className="bg-[#14151B] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/5 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                  <th className="py-3.5 px-4">Customer Name</th>
                  <th className="py-3.5 px-4">Phone</th>
                  <th className="py-3.5 px-4">Email</th>
                  <th className="py-3.5 px-4">Total Orders</th>
                  <th className="py-3.5 px-4">Total Spend</th>
                  <th className="py-3.5 px-4">Last Activity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm">
                {filteredCustomers.map((c, idx) => (
                  <tr key={idx} className="hover:bg-white/5 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-white">{c.name}</td>
                    <td className="py-3.5 px-4 text-xs text-gray-300">{c.phone}</td>
                    <td className="py-3.5 px-4 text-xs text-gray-400">{c.email}</td>
                    <td className="py-3.5 px-4 font-bold text-white">{c.orderCount}</td>
                    <td className="py-3.5 px-4 font-extrabold text-[#D4AF37]">
                      Rs. {c.totalSpend.toLocaleString('en-US')}
                    </td>
                    <td className="py-3.5 px-4 text-xs text-gray-400">{c.lastOrder}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
