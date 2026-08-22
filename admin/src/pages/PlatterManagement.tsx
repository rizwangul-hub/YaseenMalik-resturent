import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Flame, CheckCircle, XCircle } from 'lucide-react';
import platterService from '../services/platterService';
import { Platter } from '../types';
import { useToast } from '../context/ToastContext';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { DynamicItemsInput } from '../components/DynamicItemsInput';
import { SkeletonTable, EmptyState } from '../components/LoadingSkeleton';
import { ImageUploader } from '../components/ImageUploader';

export const PlatterManagement: React.FC = () => {
  const [platters, setPlatters] = useState<Platter[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlatter, setEditingPlatter] = useState<Platter | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    urduName: '',
    price: 0,
    serves: '4 - 6 Persons',
    description: '',
    imageUrl: '',
    badge: 'Most Popular',
    isPopular: true,
    spiceLevel: 'Medium' as 'Mild' | 'Medium' | 'Authentic Spicy',
    prepTime: '20-25 mins',
    includes: [] as string[],
    isFeatured: true,
    isAvailable: true,
  });

  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const { showToast } = useToast();

  useEffect(() => {
    fetchPlatters();
  }, []);

  const fetchPlatters = async () => {
    setIsLoading(true);
    try {
      const res = await platterService.getPlatters();
      setPlatters(res);
    } catch (err) {
      showToast('Failed to load platters', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenCreateModal = () => {
    setEditingPlatter(null);
    setFormData({
      name: '',
      urduName: '',
      price: 4500,
      serves: '4 – 6 Persons',
      description: '',
      imageUrl: '/assets/images/hero_bbq_platter_1787336142698.jpg',
      badge: 'Royal Feast',
      isPopular: true,
      spiceLevel: 'Medium',
      prepTime: '20-25 mins',
      includes: ['6 Pcs Malai Boti', '6 Pcs Chicken Boti', '8 Pcs Seekh Kabab'],
      isFeatured: true,
      isAvailable: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (platter: Platter) => {
    setEditingPlatter(platter);
    setFormData({
      name: platter.name,
      urduName: platter.urduName || '',
      price: platter.price,
      serves: platter.serves || '',
      description: platter.description,
      imageUrl: platter.imageUrl,
      badge: platter.badge || '',
      isPopular: !!platter.isPopular,
      spiceLevel: platter.spiceLevel || 'Medium',
      prepTime: platter.prepTime || '',
      includes: platter.includes || [],
      isFeatured: platter.isFeatured !== false,
      isAvailable: platter.isAvailable !== false,
    });
    setIsModalOpen(true);
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || formData.price <= 0 || formData.includes.length === 0) {
      showToast('Please provide platter name, price, and at least one included item', 'error');
      return;
    }

    try {
      if (editingPlatter) {
        await platterService.updatePlatter(editingPlatter.id, formData);
        showToast('Platter updated successfully!', 'success');
      } else {
        await platterService.createPlatter(formData);
        showToast('Platter created successfully!', 'success');
      }
      setIsModalOpen(false);
      fetchPlatters();
    } catch (err) {
      showToast('Error saving platter', 'error');
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deletingId) return;
    setIsDeleting(true);
    try {
      await platterService.deletePlatter(deletingId);
      showToast('Platter deleted successfully', 'success');
      setDeletingId(null);
      fetchPlatters();
    } catch (err) {
      showToast('Failed to delete platter', 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Signature Platters & Deals CMS</h1>
          <p className="text-xs text-gray-400">Manage Royal Family Platters, prices & Cloudinary deal images</p>
        </div>
        <button
          onClick={handleOpenCreateModal}
          className="flex items-center space-x-2 px-4 py-2.5 bg-[#D4AF37] hover:bg-[#B59226] text-black font-bold rounded-xl text-sm transition-colors shadow-lg shadow-[#D4AF37]/20"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Deal / Platter</span>
        </button>
      </div>

      {isLoading ? (
        <SkeletonTable />
      ) : platters.length === 0 ? (
        <EmptyState
          title="No Platters Found"
          description="Create royal family platters for your guests."
          actionText="Create Platter"
          onAction={handleOpenCreateModal}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {platters.map((platter) => (
            <div
              key={platter.id}
              className="bg-[#14151B] border border-white/10 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48">
                  <img src={platter.imageUrl} alt={platter.name} className="w-full h-full object-cover" />
                  {platter.badge && (
                    <span className="absolute top-3 left-3 px-3 py-1 bg-[#D4AF37] text-black font-bold text-xs rounded-full shadow-lg">
                      {platter.badge}
                    </span>
                  )}
                  <span className="absolute bottom-3 right-3 px-3 py-1 bg-black/80 text-white font-extrabold text-sm rounded-xl backdrop-blur-sm border border-white/10">
                    Rs. {platter.price.toLocaleString('en-US')}
                  </span>
                </div>

                <div className="p-5 space-y-3">
                  <div>
                    <h3 className="text-lg font-bold text-white">{platter.name}</h3>
                    {platter.urduName && (
                      <p className="text-xs text-[#D4AF37] font-urdu">{platter.urduName}</p>
                    )}
                    <p className="text-xs text-gray-400 mt-1">{platter.serves || 'Family Feast'}</p>
                  </div>

                  <p className="text-xs text-gray-300 line-clamp-2">{platter.description}</p>

                  <div className="space-y-1.5 pt-2 border-t border-white/10">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                      Includes ({platter.includes.length} items):
                    </span>
                    <ul className="text-xs text-gray-300 space-y-1 max-h-28 overflow-y-auto pr-1">
                      {platter.includes.map((inc, i) => (
                        <li key={i} className="flex items-center space-x-1.5">
                          <span className="text-[#D4AF37]">✓</span>
                          <span className="truncate">{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-white/5 border-t border-white/10 flex items-center justify-between">
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                    platter.isAvailable !== false
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'bg-red-500/10 text-red-400 border border-red-500/20'
                  }`}
                >
                  {platter.isAvailable !== false ? 'Available' : 'Unavailable'}
                </span>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleOpenEditModal(platter)}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDeletingId(platter.id)}
                    className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="bg-[#14151B] border border-white/10 rounded-2xl p-6 max-w-xl w-full shadow-2xl space-y-4 my-8 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-white">
              {editingPlatter ? 'Edit Deal / Platter' : 'Create New Deal / Platter'}
            </h3>

            <form onSubmit={handleSubmitForm} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                    Platter / Deal Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Balochi Platter"
                    className="w-full bg-[#0D0E12] border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                    Urdu Name
                  </label>
                  <input
                    type="text"
                    value={formData.urduName}
                    onChange={(e) => setFormData({ ...formData, urduName: e.target.value })}
                    placeholder="e.g. بلوچی شاہی پلیٹر"
                    className="w-full bg-[#0D0E12] border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:border-[#D4AF37] focus:outline-none font-urdu"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                    Price (Rs.) *
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full bg-[#0D0E12] border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                    Serves
                  </label>
                  <input
                    type="text"
                    value={formData.serves}
                    onChange={(e) => setFormData({ ...formData, serves: e.target.value })}
                    placeholder="e.g. 8 – 12 Persons"
                    className="w-full bg-[#0D0E12] border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Royal feast description..."
                  className="w-full bg-[#0D0E12] border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              {/* Dynamic Included Items Editor */}
              <DynamicItemsInput
                items={formData.includes}
                onChange={(updated) => setFormData({ ...formData, includes: updated })}
              />

              {/* Cloudinary Image Uploader */}
              <ImageUploader
                label="Deal / Platter Image (Cloudinary)"
                value={formData.imageUrl}
                onChange={(url) => setFormData({ ...formData, imageUrl: url })}
                folder="yaseen_malak_deals"
              />

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
                  Save Platter / Deal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmDialog
        isOpen={!!deletingId}
        title="Delete Platter"
        message="Are you sure you want to delete this signature platter?"
        confirmText="Delete"
        isLoading={isDeleting}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeletingId(null)}
      />
    </div>
  );
};
