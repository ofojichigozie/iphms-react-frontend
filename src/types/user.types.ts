/**
 * User related types
 */

import { BaseModel } from './common.types';

/**
 * User model
 */
export interface User extends BaseModel {
  name: string;
  email: string;
  dateOfBirth: string;
  deviceId: string;
  role: string;
}

/**
 * Data for updating a user
 */
export interface UpdateUserData {
  name?: string;
  email?: string;
  password?: string;
  dateOfBirth?: string;
  deviceId?: string;
}

/**
 * User profile form data (extends UpdateUserData with confirmPassword)
 */
export interface UserProfileFormData extends UpdateUserData {
  confirmPassword?: string;
}
