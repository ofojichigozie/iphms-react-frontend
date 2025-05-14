import { useState, useEffect } from 'react';
import UserService from '../services/user.service';
import { User, UpdateUserData, Message } from '../types';

interface UseUsersProps {
  id?: number;
}

export const useUsers = ({ id }: UseUsersProps = {}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<Message | null>(null);

  // Fetch all users
  const fetchUsers = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await UserService.getUsers();
      setUsers(data);
    } catch (err: any) {
      setError('Failed to fetch users');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch a single user by ID
  const fetchUserById = async (userId: number) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await UserService.getUser(userId);
      setUser(data);
    } catch (err: any) {
      setError('Failed to fetch user data');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Update a user
  const updateUser = async (userId: number, data: UpdateUserData) => {
    setIsLoading(true);
    setMessage(null);

    try {
      const updatedUser = await UserService.updateUser(userId, data);
      setUser(updatedUser);
      setMessage({ type: 'success', text: 'User updated successfully' });
      return updatedUser;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to update user';
      setMessage({ type: 'error', text: errorMessage });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Delete a user
  const deleteUser = async (userId: number) => {
    setIsLoading(true);
    setMessage(null);

    try {
      await UserService.deleteUser(userId);
      setUsers(users.filter(u => u.ID !== userId));
      setMessage({ type: 'success', text: 'User deleted successfully' });
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to delete user';
      setMessage({ type: 'error', text: errorMessage });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    if (id) {
      fetchUserById(id);
    } else {
      fetchUsers();
    }
  }, [id]);

  return {
    users,
    user,
    isLoading,
    error,
    message,
    setMessage,
    fetchUsers,
    fetchUserById,
    updateUser,
    deleteUser
  };
};

export default useUsers;
