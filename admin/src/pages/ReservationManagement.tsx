import React, { useState, useEffect } from 'react';
import { CalendarCheck, Search, Filter } from 'lucide-react';
import reservationService from '../services/reservationService';
import { useToast } from '../context/ToastContext';
import { SkeletonTable, EmptyState } from '../components/LoadingSkeleton';

export const ReservationManagement: React.FC = () => {
  const [reservations, setReservations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const { showToast } = useToast();

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    setIsLoading(true);
    try {
      const res = await reservationService.getReservations();
      setReservations(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      showToast('Failed to load table reservations', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await reservationService.updateReservationStatus(id, newStatus);
      showToast(`Reservation status updated to ${newStatus}`, 'success');
      fetchReservations();
    } catch (err) {
      showToast('Failed to update reservation status', 'error');
    }
  };

  const filteredReservations = reservations.filter((r) => {
    const matchesSearch =
      r.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || r.phone.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' ? true : r.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Table Reservation Management</h1>
          <p className="text-xs text-gray-400">Manage family dining bookings & seating preferences</p>
        </div>

        <div className="flex items-center bg-[#14151B] border border-white/10 p-1 rounded-xl text-xs">
          {['all', 'PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg capitalize transition-colors ${
                statusFilter === st ? 'bg-[#D4AF37] text-black font-bold' : 'text-gray-400 hover:text-white'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-[#14151B] border border-white/10 p-4 rounded-2xl">
        <div className="relative max-w-xs">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by customer or phone..."
            className="w-full bg-[#0D0E12] border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]"
          />
        </div>
      </div>

      {isLoading ? (
        <SkeletonTable />
      ) : filteredReservations.length === 0 ? (
        <EmptyState title="No Reservations Found" description="Table booking requests will appear here." />
      ) : (
        <div className="bg-[#14151B] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/5 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                  <th className="py-3.5 px-4">Customer</th>
                  <th className="py-3.5 px-4">Phone</th>
                  <th className="py-3.5 px-4">Guests</th>
                  <th className="py-3.5 px-4">Date & Time</th>
                  <th className="py-3.5 px-4">Seating</th>
                  <th className="py-3.5 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm">
                {filteredReservations.map((r) => (
                  <tr key={r._id || r.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-white">{r.customerName}</td>
                    <td className="py-3.5 px-4 text-xs text-gray-300">{r.phone}</td>
                    <td className="py-3.5 px-4 font-bold text-[#D4AF37]">{r.guests} Persons</td>
                    <td className="py-3.5 px-4 text-xs text-gray-300">
                      {r.date} at {r.time}
                    </td>
                    <td className="py-3.5 px-4 text-xs text-gray-400 capitalize">
                      {r.seatingPreference ? r.seatingPreference.replace('-', ' ') : 'Family Hall'}
                    </td>
                    <td className="py-3.5 px-4">
                      <select
                        value={r.status}
                        onChange={(e) => handleStatusChange(r._id || r.id, e.target.value)}
                        className="bg-[#0D0E12] border border-white/10 rounded-xl px-2.5 py-1 text-xs font-bold text-white focus:outline-none"
                      >
                        <option value="PENDING">PENDING</option>
                        <option value="CONFIRMED">CONFIRMED</option>
                        <option value="COMPLETED">COMPLETED</option>
                        <option value="CANCELLED">CANCELLED</option>
                      </select>
                    </td>
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
