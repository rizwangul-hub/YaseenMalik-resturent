import api from './api';
import { MENU_ITEMS, SPECIALTIES_LIST } from '../data/restaurantData';
import { MenuItem } from '../types';

export const menuService = {
  async getMenuItems(params?: Record<string, any>): Promise<MenuItem[]> {
    try {
      const response = await api.get('/menu', { params });
      if (response.data && response.data.success && Array.isArray(response.data.data) && response.data.data.length > 0) {
        return response.data.data;
      }
    } catch (error) {
      console.warn('[MenuService] API unavailable, using fallback menu data');
    }
    return MENU_ITEMS;
  },

  async getSpecialties(): Promise<MenuItem[]> {
    try {
      const response = await api.get('/menu', { params: { isSpecialty: 'true' } });
      if (response.data && response.data.success && Array.isArray(response.data.data) && response.data.data.length > 0) {
        return response.data.data;
      }
    } catch (error) {
      console.warn('[MenuService] API unavailable, using fallback specialties data');
    }
    return SPECIALTIES_LIST;
  },

  async createMenuItem(data: Partial<MenuItem>) {
    const response = await api.post('/menu', data);
    return response.data;
  },

  async updateMenuItem(id: string, data: Partial<MenuItem>) {
    const response = await api.put(`/menu/${id}`, data);
    return response.data;
  },

  async deleteMenuItem(id: string) {
    const response = await api.delete(`/menu/${id}`);
    return response.data;
  },
};

export default menuService;
