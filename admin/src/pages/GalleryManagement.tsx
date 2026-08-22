import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Image as ImageIcon } from 'lucide-react';
import galleryService from '../services/galleryService';
import { GalleryItem } from '../types';
import { useToast } from '../context/ToastContext';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { SkeletonCard, EmptyState } from '../components/LoadingSkeleton';

export const GalleryManagement: React.FC = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: 'platters' as 'platters' | 'bbq' | 'sajji' | 'ambiance',
    categoryLabel: 'Platters',
    imageUrl: '',
    description: '',
  });

  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const { showToast } = useToast();

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    setIsLoading(true);
    try {
      const res = await galleryService.getGalleryItems();
      setItems(res);
    } catch (err) {
      showToast('Failed to load gallery images', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.imageUrl) {
      showToast('Please provide photo title and image URL', 'error');
      return;
    }

    try {
      await galleryService.createGalleryItem(formData);
      showToast('Photo added to gallery!', 'success');
      setIsModalOpen(false);
      fetchGallery();
    } catch (err) {
      showToast('Failed to add photo', 'error');
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deletingId) return;
    setIsDeleting(true);
    try {
      await galleryService.deleteGalleryItem(deletingId);
      showToast('Photo removed from gallery', 'success');
      setDeletingId(null);
      fetchGallery();
    } catch (err) {
      showToast('Failed to delete photo', 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Food & Ambiance Gallery</h1>
          <p className="text-xs text-gray-400">Manage high-resolution restaurant showcase photos</p>
        </div>
        <button
          onClick={() => {
            setFormData({
              title: '',
              category: 'platters',
              categoryLabel: 'Platters',
              imageUrl: '/assets/images/hero_bbq_platter_1787336142698.jpg',
              description: '',
            });
            setIsModalOpen(true);
          }}
          className="flex items-center space-x-2 px-4 py-2.5 bg-[#D4AF37] hover:bg-[#B59226] text-black font-bold rounded-xl text-sm transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Upload Gallery Photo</span>
        </button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : items.length === 0 ? (
        <EmptyState
          title="No Gallery Photos"
          description="Upload food photos and restaurant ambiance shots."
          actionText="Upload Photo"
          onAction={() => setIsModalOpen(true)}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-[#14151B] border border-white/10 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 bg-black/70 backdrop-blur-sm text-[#D4AF37] text-xs font-semibold rounded-lg capitalize border border-white/10">
                    {item.categoryLabel || item.category}
                  </span>
                </div>
                <div className="p-4 space-y-1">
                  <h3 className="text-sm font-bold text-white">{item.title}</h3>
                  <p className="text-xs text-gray-400 line-clamp-2">{item.description}</p>
                </div>
              </div>

              <div className="p-3 bg-white/5 border-t border-white/10 flex justify-end">
                <button
                  onClick={() => setDeletingId(item.id)}
                  className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#14151B] border border-white/10 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-white">Upload Gallery Photo</h3>

            <form onSubmit={handleSubmitForm} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                  Photo Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Sizzling Chapli Kabab"
                  className="w-full bg-[#0D0E12] border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      category: e.target.value as any,
                      categoryLabel: e.target.options[e.target.selectedIndex].text,
                    })
                  }
                  className="w-full bg-[#0D0E12] border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                >
                  <option value="platters">Royal Platters</option>
                  <option value="bbq">BBQ & Kababs</option>
                  <option value="sajji">Sajji & Rice</option>
                  <option value="ambiance">Ambiance & Dining</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                  Image URL / Asset Path *
                </label>
                <input
                  type="text"
                  required
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="w-full bg-[#0D0E12] border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-[#0D0E12] border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm text-gray-400 hover:text-white bg-white/5 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#D4AF37] hover:bg-[#B59226] text-black font-semibold text-sm rounded-xl"
                >
                  Upload Photo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmDialog
        isOpen={!!deletingId}
        title="Remove Photo"
        message="Are you sure you want to remove this photo from the gallery?"
        confirmText="Remove"
        isLoading={isDeleting}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeletingId(null)}
      />
    </div>
  );
};
