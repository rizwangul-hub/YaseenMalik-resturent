import api from './api';

export const categoryService = {
  async getCategories() {
    try {
      const response = await api.get('/categories');
      if (response.data && response.data.success && Array.isArray(response.data.data) && response.data.data.length > 0) {
        return response.data.data;
      }
    } catch (error) {
      console.warn('[CategoryService] API unavailable, using default categories');
    }
    return [
      { id: '1', name: 'BBQ Grill', slug: 'bbq', isActive: true, sortOrder: 1 },
      { id: '2', name: 'Special Sajji', slug: 'chicken', isActive: true, sortOrder: 2 },
      { id: '3', name: 'Kababs', slug: 'kababs', isActive: true, sortOrder: 3 },
      { id: '4', name: 'Mutton Specialty', slug: 'mutton', isActive: true, sortOrder: 4 },
      { id: '5', name: 'Rice & Pulao', slug: 'rice', isActive: true, sortOrder: 5 },
      { id: '6', name: 'Platters', slug: 'platters', isActive: true, sortOrder: 6 },
      { id: '7', name: 'Special Items', slug: 'special', isActive: true, sortOrder: 7 },
      { id: '8', name: 'Drinks & Tea', slug: 'drinks', isActive: true, sortOrder: 8 },
    ];
  },

  async createCategory(data: any) {
    const response = await api.post('/categories', data);
    return response.data;
  },

  async updateCategory(id: string, data: any) {
    const response = await api.put(`/categories/${id}`, data);
    return response.data;
  },

  async deleteCategory(id: string) {
    const response = await api.delete(`/categories/${id}`);
    return response.data;
  },
};

export default categoryService;
