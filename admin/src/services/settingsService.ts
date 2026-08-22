import api from './api';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const settingsService = {
  async getSettings() {
    try {
      const response = await api.get('/settings');
      if (response.data && response.data.success && response.data.data) {
        return response.data.data;
      }
    } catch (error) {
      console.warn('[SettingsService] API unavailable, using fallback restaurant info');
    }
    return RESTAURANT_INFO;
  },

  async updateSettings(data: any) {
    const response = await api.put('/settings', data);
    return response.data;
  },
};

export default settingsService;
