/**
 * Authentication related types
 */

import { User } from './user.types';

/**
 * Registration request data
 */
export interface RegisterData {
  name: string;
  email: string;
  password: string;
  dateOfBirth: string;
  deviceId: string;
}

/**
 * Login request data
 */
export interface LoginData {
  email: string;
  password: string;
}

/**
 * Authentication response from the server
 */
export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

/**
 * Authentication context state
 */
export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

/**
 * Authentication context methods
 */
export interface AuthMethods {
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
}

/**
 * Combined authentication context type
 */
export type AuthContextType = AuthState & AuthMethods;
