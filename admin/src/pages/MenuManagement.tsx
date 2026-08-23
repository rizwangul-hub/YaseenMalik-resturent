import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit2, Trash2, Filter, Eye, Star, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import menuService from '../services/menuService';
import categoryService from '../services/categoryService';
import { MenuItem } from '../types';
import { useToast } from '../context/ToastContext';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { SkeletonTable, EmptyState } from '../components/LoadingSkeleton';
import { ImageUploader } from '../components/ImageUploader';

export const MenuManagement: React.FC = () => {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filters & Search
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [availabilityFilter, setAvailabilityFilter] = useState<string>('all');

  // Modal Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    urduName: '',
    category: 'bbq',
    categoryLabel: 'BBQ Grill',
    price: 0,
    description: '',
    imageUrl: '',
    isAvailable: true,
    isFeatured: false,
    isSpecialty: false,
    isBestSeller: false,
    servingSize: '',
    sortOrder: 0,
  });

  // Delete Dialog State
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const { showToast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [menuRes, catRes] = await Promise.all([
        menuService.getMenuItems(),
        categoryService.getCategories().catch(() => []),
      ]);
      setItems(menuRes);
      setCategories(catRes);
    } catch (err) {
      showToast('Failed to load menu items', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenCreateModal = () => {
    setEditingItem(null);
    setFormData({
      name: '',
      urduName: '',
      category: 'bbq',
      categoryLabel: 'BBQ Grill',
      price: 0,
      description: '',
      imageUrl: '/assets/images/hero_bbq_platter_1787336142698.jpg',
      isAvailable: true,
      isFeatured: false,
      isSpecialty: false,
      isBestSeller: false,
      servingSize: '1 Plate',
      sortOrder: 0,
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item: MenuItem) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      urduName: item.urduName || '',
      category: item.category,
      categoryLabel: item.categoryLabel || '',
      price: item.price,
      description: item.description,
      imageUrl: item.imageUrl,
      isAvailable: item.isAvailable !== false,
      isFeatured: !!item.isFeatured,
      isSpecialty: !!item.isSpecialty,
      isBestSeller: !!item.isBestSeller,
      servingSize: item.servingSize || '',
      sortOrder: 0,
    });
    setIsModalOpen(true);
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || formData.price <= 0) {
      showToast('Please provide a valid dish name and price', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      if (editingItem) {
        await menuService.updateMenuItem(editingItem.id, formData);
        showToast('Menu item updated successfully!', 'success');
      } else {
        await menuService.createMenuItem(formData);
        showToast('Menu item created successfully!', 'success');
      }
      setIsModalOpen(false);
      fetchData();
    } catch (err) {
      showToast('Error saving menu item', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deletingId) return;
    setIsDeleting(true);
    try {
      await menuService.deleteMenuItem(deletingId);
      showToast('Menu item deleted successfully', 'success');
      setDeletingId(null);
      fetchData();
    } catch (err) {
      showToast('Failed to delete item', 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleToggleAvailability = async (item: MenuItem) => {
    try {
      const newStatus = !(item.isAvailable !== false);
      await menuService.updateMenuItem(item.id, { isAvailable: newStatus });
      showToast(`Item ${newStatus ? 'available' : 'unavailable'} now`, 'info');
      fetchData();
    } catch (err) {
      showToast('Failed to update availability', 'error');
    }
  };

  // Filtered List
  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.urduName && item.urduName.includes(searchTerm));
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesAvailability =
      availabilityFilter === 'all'
        ? true
        : availabilityFilter === 'available'
        ? item.isAvailable !== false
        : item.isAvailable === false;
    return matchesSearch && matchesCategory && matchesAvailability;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Menu Management</h1>
          <p className="text-xs text-gray-400">Manage individual dishes, prices, and Cloudinary images</p>
        </div>
        <button
          onClick={handleOpenCreateModal}
          className="flex items-center space-x-2 px-4 py-2.5 bg-[#D4AF37] hover:bg-[#B59226] text-black font-bold rounded-xl text-sm transition-colors shadow-lg shadow-[#D4AF37]/20"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Menu Item</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-[#14151B] border border-white/10 p-4 rounded-2xl flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search dish or Urdu name..."
            className="w-full bg-[#0D0E12] border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-[#0D0E12] border border-white/10 rounded-xl px-3 py-2 text-xs text-gray-300 focus:outline-none focus:border-[#D4AF37]"
            >
              <option value="all">All Categories</option>
              <option value="bbq">BBQ Grill</option>
              <option value="chicken">Special Sajji</option>
              <option value="kababs">Kababs</option>
              <option value="mutton">Mutton Specialty</option>
              <option value="rice">Rice & Pulao</option>
              <option value="special">Special Items</option>
              <option value="drinks">Drinks & Tea</option>
            </select>
          </div>

          <select
            value={availabilityFilter}
            onChange={(e) => setAvailabilityFilter(e.target.value)}
            className="bg-[#0D0E12] border border-white/10 rounded-xl px-3 py-2 text-xs text-gray-300 focus:outline-none focus:border-[#D4AF37]"
          >
            <option value="all">All Availability</option>
            <option value="available">Available Only</option>
            <option value="unavailable">Unavailable Only</option>
          </select>
        </div>
      </div>

      {/* Items Table */}
      {isLoading ? (
        <SkeletonTable />
      ) : filteredItems.length === 0 ? (
        <EmptyState
          title="No Menu Items Found"
          description="Try adjusting your search or category filter criteria."
          actionText="Add New Item"
          onAction={handleOpenCreateModal}
        />
      ) : (
        <div className="bg-[#14151B] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/5 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                  <th className="py-3.5 px-4">Dish</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Price</th>
                  <th className="py-3.5 px-4">Serving</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm">
                {filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-10 h-10 rounded-xl object-cover border border-white/10"
                        />
                        <div>
                          <p className="font-semibold text-white">{item.name}</p>
                          {item.urduName && (
                            <p className="text-xs text-[#D4AF37] font-urdu">{item.urduName}</p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 rounded-lg text-xs bg-white/5 border border-white/10 text-gray-300 capitalize">
                        {item.categoryLabel || item.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-white">
                      Rs. {item.price.toLocaleString('en-US')}
                    </td>
                    <td className="py-3.5 px-4 text-xs text-gray-400">
                      {item.servingSize || 'N/A'}
                    </td>
                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => handleToggleAvailability(item)}
                        className={`px-2.5 py-1 rounded-full text-xs font-semibold flex items-center space-x-1 transition-colors ${
                          item.isAvailable !== false
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : 'bg-red-500/10 text-red-400 border border-red-500/20'
                        }`}
                      >
                        {item.isAvailable !== false ? (
                          <>
                            <CheckCircle className="w-3 h-3" />
                            <span>Available</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3 h-3" />
                            <span>Sold Out</span>
                          </>
                        )}
                      </button>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => handleOpenEditModal(item)}
                          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
                          title="Edit Item"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeletingId(item.id)}
                          className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                          title="Delete Item"
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

      {/* Modal Form for Create / Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="bg-[#14151B] border border-white/10 rounded-2xl p-6 max-w-lg w-full shadow-2xl space-y-4 my-8 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-white">
              {editingItem ? 'Edit Menu Item' : 'Add New Menu Item'}
            </h3>

            <form onSubmit={handleSubmitForm} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                    Dish Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Malai Boti"
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
                    placeholder="e.g. ملائی بوٹی"
                    className="w-full bg-[#0D0E12] border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:border-[#D4AF37] focus:outline-none font-urdu"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-[#0D0E12] border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                  >
                    <option value="bbq">BBQ Grill</option>
                    <option value="chicken">Special Sajji</option>
                    <option value="kababs">Kababs</option>
                    <option value="mutton">Mutton Specialty</option>
                    <option value="rice">Rice & Pulao</option>
                    <option value="special">Special Items</option>
                    <option value="drinks">Drinks & Tea</option>
                  </select>
                </div>

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
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Short description of ingredients or cooking technique..."
                  className="w-full bg-[#0D0E12] border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              {/* Cloudinary Image Uploader */}
              <ImageUploader
                label="Dish Image (Cloudinary)"
                value={formData.imageUrl}
                onChange={(url) => setFormData({ ...formData, imageUrl: url })}
                folder="yaseen_malak_menu"
              />

              <div className="flex items-center space-x-6 pt-2">
                <label className="flex items-center space-x-2 text-sm text-gray-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isAvailable}
                    onChange={(e) => setFormData({ ...formData, isAvailable: e.target.checked })}
                    className="rounded border-white/10 bg-[#0D0E12] text-[#D4AF37]"
                  />
                  <span>Available</span>
                </label>
                <label className="flex items-center space-x-2 text-sm text-gray-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="rounded border-white/10 bg-[#0D0E12] text-[#D4AF37]"
                  />
                  <span>Featured</span>
                </label>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  disabled={isSubmitting}
                  className="px-4 py-2 text-sm text-gray-400 hover:text-white bg-white/5 rounded-xl disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-[#D4AF37] hover:bg-[#B59226] text-black font-semibold text-sm rounded-xl flex items-center space-x-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-black" />
                      <span>Saving Item...</span>
                    </>
                  ) : (
                    <span>{editingItem ? 'Save Changes' : 'Create Item'}</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!deletingId}
        title="Delete Menu Item"
        message="Are you sure you want to delete this dish from the menu? This action cannot be undone."
        confirmText="Delete Item"
        isLoading={isDeleting}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeletingId(null)}
      />
    </div>
  );
};
