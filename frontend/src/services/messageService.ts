import api from './api';

export const messageService = {
  async sendMessage(data: { name: string; email: string; phone: string; message: string }) {
    const response = await api.post('/messages', data);
    return response.data;
  },

  async getMessages() {
    const response = await api.get('/messages');
    return response.data;
  },

  async markAsRead(id: string, isRead = true) {
    const response = await api.put(`/messages/${id}/read`, { isRead });
    return response.data;
  },

  async deleteMessage(id: string) {
    const response = await api.delete(`/messages/${id}`);
    return response.data;
  },
};

export default messageService;
