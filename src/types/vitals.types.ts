/**
 * Vitals related types
 */

import { BaseModel } from './common.types';

/**
 * Vitals model
 */
export interface Vitals extends BaseModel {
  temperature: number;
  humidity: number;
  pulseRate: number;
  lightIntensity: number;
  userId: number;
}

/**
 * Data for creating vitals
 */
export interface CreateVitalsData {
  temperature: number;
  humidity: number;
  pulseRate: number;
  lightIntensity: number;
  userId: number;
}

/**
 * Chart data for vitals visualization
 */
export interface VitalsChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
    tension: number;
  }[];
}
