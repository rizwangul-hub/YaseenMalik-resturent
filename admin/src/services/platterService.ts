import api from './api';
import { SIGNATURE_PLATTERS } from '../data/restaurantData';
import { Platter } from '../types';

export const platterService = {
  async getPlatters(): Promise<Platter[]> {
    try {
      const response = await api.get('/platters');
      if (response.data && response.data.success && Array.isArray(response.data.data) && response.data.data.length > 0) {
        return response.data.data;
      }
    } catch (error) {
      console.warn('[PlatterService] API unavailable, using fallback platters data');
    }
    return SIGNATURE_PLATTERS;
  },

  async createPlatter(data: Partial<Platter>) {
    const response = await api.post('/platters', data);
    return response.data;
  },

  async updatePlatter(id: string, data: Partial<Platter>) {
    const response = await api.put(`/platters/${id}`, data);
    return response.data;
  },

  async deletePlatter(id: string) {
    const response = await api.delete(`/platters/${id}`);
    return response.data;
  },
};

export default platterService;
