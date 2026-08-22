import api from './api';
import { GALLERY_ITEMS } from '../data/restaurantData';
import { GalleryItem } from '../types';

export const galleryService = {
  async getGalleryItems(): Promise<GalleryItem[]> {
    try {
      const response = await api.get('/gallery');
      if (response.data && response.data.success && Array.isArray(response.data.data) && response.data.data.length > 0) {
        return response.data.data;
      }
    } catch (error) {
      console.warn('[GalleryService] API unavailable, using fallback gallery data');
    }
    return GALLERY_ITEMS;
  },

  async createGalleryItem(data: Partial<GalleryItem>) {
    const response = await api.post('/gallery', data);
    return response.data;
  },

  async deleteGalleryItem(id: string) {
    const response = await api.delete(`/gallery/${id}`);
    return response.data;
  },
};

export default galleryService;
