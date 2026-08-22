import api from './api';

export const uploadService = {
  uploadImage: async (image: string, folder?: string) => {
    const res = await api.post('/upload', { image, folder });
    return res.data;
  },
};

export default uploadService;
