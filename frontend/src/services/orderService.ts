import api from './api';

export const orderService = {
  async createOrder(orderData: {
    customerName: string;
    phone: string;
    email?: string;
    address?: string;
    orderType: 'DELIVERY' | 'PICKUP' | 'ORDER';
    items: Array<{ itemId: string; name: string; price: number; quantity: number; type: 'dish' | 'platter' }>;
    subtotal?: number;
    total?: number;
    notes?: string;
    paymentMethod?: string;
  }) {
    const response = await api.post('/orders', orderData);
    return response.data;
  },

  async trackOrder(orderNumber: string, phone: string) {
    const response = await api.get('/orders/track', { params: { orderNumber, phone } });
    return response.data;
  },

  async getOrders(params?: Record<string, any>) {
    const response = await api.get('/orders', { params });
    return response.data;
  },

  async updateOrderStatus(id: string, status: string) {
    const response = await api.put(`/orders/${id}/status`, { status });
    return response.data;
  },
};

export default orderService;
