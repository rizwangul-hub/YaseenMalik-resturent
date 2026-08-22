import React, { useState, useEffect } from 'react';
import { Star, CheckCircle, XCircle, Trash2, Filter } from 'lucide-react';
import reviewService from '../services/reviewService';
import { Review } from '../types';
import { useToast } from '../context/ToastContext';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { SkeletonTable, EmptyState } from '../components/LoadingSkeleton';

export const ReviewManagement: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'featured'>('all');

  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const { showToast } = useToast();

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    setIsLoading(true);
    try {
      const res = await reviewService.getReviews();
      setReviews(res);
    } catch (err) {
      showToast('Failed to load reviews', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleApprove = async (review: Review) => {
    try {
      const newStatus = !review.isApproved;
      await reviewService.approveReview(review.id, newStatus);
      showToast(`Review ${newStatus ? 'approved' : 'unapproved'}`, 'info');
      fetchReviews();
    } catch (err) {
      showToast('Failed to update review status', 'error');
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deletingId) return;
    setIsDeleting(true);
    try {
      await reviewService.deleteReview(deletingId);
      showToast('Review deleted successfully', 'success');
      setDeletingId(null);
      fetchReviews();
    } catch (err) {
      showToast('Failed to delete review', 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  const filteredReviews = reviews.filter((r: any) => {
    if (statusFilter === 'pending') return r.isApproved === false;
    if (statusFilter === 'approved') return r.isApproved !== false;
    if (statusFilter === 'featured') return !!r.isFeatured;
    return true;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Customer Reviews Moderation</h1>
          <p className="text-xs text-gray-400">Moderate customer ratings & approve testimonials</p>
        </div>

        {/* Status Filters */}
        <div className="flex items-center bg-[#14151B] border border-white/10 p-1 rounded-xl text-xs">
          {(['all', 'pending', 'approved', 'featured'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setStatusFilter(filter)}
              className={`px-3 py-1.5 rounded-lg capitalize transition-colors ${
                statusFilter === filter
                  ? 'bg-[#D4AF37] text-black font-bold'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <SkeletonTable />
      ) : filteredReviews.length === 0 ? (
        <EmptyState
          title="No Reviews Found"
          description="Customer reviews and ratings will appear here."
        />
      ) : (
        <div className="bg-[#14151B] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/5 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                  <th className="py-3.5 px-4">Customer</th>
                  <th className="py-3.5 px-4">Rating</th>
                  <th className="py-3.5 px-4">Review Comment</th>
                  <th className="py-3.5 px-4">Dish Recommended</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm">
                {filteredReviews.map((rev: any) => (
                  <tr key={rev._id || rev.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-3.5 px-4">
                      <div>
                        <p className="font-bold text-white">{rev.author || rev.customerName}</p>
                        <p className="text-xs text-gray-400">{rev.location || 'Peshawar, KP'}</p>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center text-amber-400">
                        {Array.from({ length: rev.rating || 5 }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 max-w-xs text-xs text-gray-300">
                      <p className="line-clamp-2">{rev.comment || rev.review}</p>
                    </td>
                    <td className="py-3.5 px-4 text-xs text-[#D4AF37]">
                      {rev.dishRecommended || 'General Review'}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                          rev.isApproved !== false
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                        }`}
                      >
                        {rev.isApproved !== false ? 'Approved' : 'Pending'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => handleToggleApprove(rev)}
                          className={`p-2 rounded-lg transition-colors ${
                            rev.isApproved !== false
                              ? 'bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-400'
                              : 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400'
                          }`}
                          title={rev.isApproved !== false ? 'Unapprove' : 'Approve'}
                        >
                          {rev.isApproved !== false ? <XCircle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => setDeletingId(rev._id || rev.id)}
                          className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400"
                          title="Delete Review"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <ConfirmDialog
        isOpen={!!deletingId}
        title="Delete Review"
        message="Are you sure you want to delete this customer review?"
        confirmText="Delete"
        isLoading={isDeleting}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeletingId(null)}
      />
    </div>
  );
};
