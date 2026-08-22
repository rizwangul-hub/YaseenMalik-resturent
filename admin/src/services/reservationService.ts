import api from './api';
import { ReservationFormData } from '../types';

export const reservationService = {
  async createReservation(reservationData: ReservationFormData) {
    const response = await api.post('/reservations', reservationData);
    return response.data;
  },

  async getReservations(params?: Record<string, any>) {
    const response = await api.get('/reservations', { params });
    return response.data;
  },

  async updateReservationStatus(id: string, status: string) {
    const response = await api.put(`/reservations/${id}/status`, { status });
    return response.data;
  },
};

export default reservationService;
