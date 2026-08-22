import api from './api';
import { REVIEWS } from '../data/restaurantData';
import { Review } from '../types';

export const reviewService = {
  async getReviews(): Promise<Review[]> {
    try {
      const response = await api.get('/reviews');
      if (response.data && response.data.success && Array.isArray(response.data.data) && response.data.data.length > 0) {
        return response.data.data;
      }
    } catch (error) {
      console.warn('[ReviewService] API unavailable, using fallback review data');
    }
    return REVIEWS;
  },

  async createReview(data: { customerName: string; rating: number; review: string; location?: string; dishRecommended?: string }) {
    const response = await api.post('/reviews', data);
    return response.data;
  },

  async approveReview(id: string, isApproved: boolean) {
    const response = await api.put(`/reviews/${id}/approve`, { isApproved });
    return response.data;
  },

  async deleteReview(id: string) {
    const response = await api.delete(`/reviews/${id}`);
    return response.data;
  },
};

export default reviewService;
