import api from './api';
import { User, UpdateUserData } from '../types';

const UserService = {
  getUsers: async (): Promise<User[]> => {
    const response = await api.get('/users');
    return response.data.data;
  },

  getUser: async (id: number): Promise<User> => {
    if (!id || isNaN(id)) {
      throw new Error('Invalid user ID');
    }
    const response = await api.get(`/users/${id}`);
    return response.data.data;
  },

  updateUser: async (id: number, data: UpdateUserData): Promise<User> => {
    if (!id || isNaN(id)) {
      throw new Error('Invalid user ID');
    }
    const response = await api.patch(`/users/${id}`, data);
    return response.data.data;
  },

  deleteUser: async (id: number): Promise<void> => {
    if (!id || isNaN(id)) {
      throw new Error('Invalid user ID');
    }
    await api.delete(`/users/${id}`);
  },
};

export default UserService;
