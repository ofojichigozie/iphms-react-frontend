import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth as useAuthContext } from '../context/AuthContext';
import { RegisterData, LoginData } from '../types';

export const useAuth = () => {
  const navigate = useNavigate();
  const { login: contextLogin, register: contextRegister, isAuthenticated } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle login
  const handleLogin = async (credentials: LoginData) => {
    setError(null);
    setIsLoading(true);

    try {
      await contextLogin(credentials);
      navigate('/dashboard');
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
        'Failed to login. Please check your credentials.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Handle registration
  const handleRegister = async (data: RegisterData) => {
    setError(null);
    setIsLoading(true);

    try {
      await contextRegister(data);
      navigate('/dashboard');
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
        'Failed to register. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    setError,
    handleLogin,
    handleRegister,
    isAuthenticated
  };
};

export default useAuth;
