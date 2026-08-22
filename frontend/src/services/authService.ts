import api from './api';

export const authService = {
  async login(credentials: { email: string; password: string }) {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  async register(data: { name: string; email: string; password: string; role?: string }) {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  async logout() {
    const response = await api.post('/auth/logout');
    return response.data;
  },

  async getMe() {
    const response = await api.get('/auth/me');
    return response.data;
  },
};

export default authService;
