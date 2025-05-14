/**
 * Common types used across the application
 */

/**
 * Base model with common fields for all models
 */
export interface BaseModel {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
}

/**
 * API response structure
 */
export interface ApiResponse<T> {
  status: boolean;
  message: string;
  data: T;
}

/**
 * Message notification type
 */
export interface Message {
  type: 'success' | 'error' | 'warning' | 'info';
  text: string;
}

/**
 * Pagination information
 */
export interface PaginationInfo {
  totalItems: number;
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  firstItemIndex: number;
  lastItemIndex: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}
