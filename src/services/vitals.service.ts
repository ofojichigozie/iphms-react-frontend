import api from './api';
import { Vitals, CreateVitalsData } from '../types';

interface GetVitalsOptions {
  userId?: number;
  startDate?: string;
  endDate?: string;
}

const VitalsService = {
  getAllVitals: async (options?: GetVitalsOptions): Promise<Vitals[]> => {
    // Build query parameters
    const params = new URLSearchParams();
    if (options?.userId) {
      params.append('userId', options.userId.toString());
    }
    if (options?.startDate) {
      params.append('startDate', options.startDate);
    }
    if (options?.endDate) {
      params.append('endDate', options.endDate);
    }

    const queryString = params.toString() ? `?${params.toString()}` : '';
    const response = await api.get(`/vitals${queryString}`);
    return response.data.data;
  },

  getVitals: async (id: number): Promise<Vitals> => {
    if (!id || isNaN(id)) {
      throw new Error('Invalid vitals ID');
    }
    const response = await api.get(`/vitals/${id}`);
    return response.data.data;
  },

  // This method would typically be called by IoT devices
  // Frontend might not use this directly
  createVitals: async (data: CreateVitalsData): Promise<Vitals> => {
    const response = await api.post('/vitals', data);
    return response.data.data;
  },
};

export default VitalsService;
