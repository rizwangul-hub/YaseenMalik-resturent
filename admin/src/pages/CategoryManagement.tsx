import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Layers, CheckCircle, XCircle } from 'lucide-react';
import categoryService from '../services/categoryService';
import { useToast } from '../context/ToastContext';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { SkeletonTable, EmptyState } from '../components/LoadingSkeleton';

export const CategoryManagement: React.FC = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    image: '',
    isActive: true,
    sortOrder: 0,
  });

  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const { showToast } = useToast();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const res = await categoryService.getCategories();
      setCategories(res);
    } catch (err) {
      showToast('Failed to load categories', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenCreateModal = () => {
    setEditingCategory(null);
    setFormData({
      name: '',
      slug: '',
      description: '',
      image: '',
      isActive: true,
      sortOrder: categories.length + 1,
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (cat: any) => {
    setEditingCategory(cat);
    setFormData({
      name: cat.name,
      slug: cat.slug,
      description: cat.description || '',
      image: cat.image || '',
      isActive: cat.isActive !== false,
      sortOrder: cat.sortOrder || 0,
    });
    setIsModalOpen(true);
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) {
      showToast('Please specify a category name', 'error');
      return;
    }

    try {
      if (editingCategory) {
        await categoryService.updateCategory(editingCategory._id || editingCategory.id, formData);
        showToast('Category updated successfully', 'success');
      } else {
        await categoryService.createCategory(formData);
        showToast('Category created successfully', 'success');
      }
      setIsModalOpen(false);
      fetchCategories();
    } catch (err) {
      showToast('Failed to save category', 'error');
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deletingId) return;
    setIsDeleting(true);
    try {
      await categoryService.deleteCategory(deletingId);
      showToast('Category deleted successfully', 'success');
      setDeletingId(null);
      fetchCategories();
    } catch (err) {
      showToast('Failed to delete category', 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Category Management</h1>
          <p className="text-xs text-gray-400">Organize menu items into display categories</p>
        </div>
        <button
          onClick={handleOpenCreateModal}
          className="flex items-center space-x-2 px-4 py-2.5 bg-[#D4AF37] hover:bg-[#B59226] text-black font-bold rounded-xl text-sm transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Category</span>
        </button>
      </div>

      {isLoading ? (
        <SkeletonTable />
      ) : categories.length === 0 ? (
        <EmptyState
          title="No Categories Found"
          description="Create categories to organize your restaurant menu."
          actionText="Create Category"
          onAction={handleOpenCreateModal}
        />
      ) : (
        <div className="bg-[#14151B] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/5 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                <th className="py-3.5 px-4">Category Name</th>
                <th className="py-3.5 px-4">Slug</th>
                <th className="py-3.5 px-4">Sort Order</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm">
              {categories.map((cat) => (
                <tr key={cat._id || cat.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-white">{cat.name}</td>
                  <td className="py-3.5 px-4 text-xs font-mono text-gray-400">{cat.slug}</td>
                  <td className="py-3.5 px-4 text-xs text-gray-300">{cat.sortOrder || 0}</td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                        cat.isActive !== false
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-red-500/10 text-red-400 border border-red-500/20'
                      }`}
                    >
                      {cat.isActive !== false ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => handleOpenEditModal(cat)}
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeletingId(cat._id || cat.id)}
                        className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400"
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
      )}

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#14151B] border border-white/10 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-white">
              {editingCategory ? 'Edit Category' : 'Create Category'}
            </h3>

            <form onSubmit={handleSubmitForm} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Mutton Specialty"
                  className="w-full bg-[#0D0E12] border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                  Slug
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="e.g. mutton-specialty"
                  className="w-full bg-[#0D0E12] border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                  Sort Order
                </label>
                <input
                  type="number"
                  value={formData.sortOrder}
                  onChange={(e) => setFormData({ ...formData, sortOrder: Number(e.target.value) })}
                  className="w-full bg-[#0D0E12] border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="rounded border-white/10 bg-[#0D0E12] text-[#D4AF37]"
                />
                <span className="text-sm text-gray-300">Active Category</span>
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
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmDialog
        isOpen={!!deletingId}
        title="Delete Category"
        message="Are you sure you want to delete this category?"
        confirmText="Delete"
        isLoading={isDeleting}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeletingId(null)}
      />
    </div>
  );
};
