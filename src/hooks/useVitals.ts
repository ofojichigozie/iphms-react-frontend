import { useState, useEffect } from 'react';
import VitalsService from '../services/vitals.service';
import { Vitals } from '../types';
import { useAuth } from '../context/AuthContext';

interface UseVitalsProps {
  id?: number;
  limit?: number;
  filterByCurrentUser?: boolean;
}

const useVitals = ({ id, limit, filterByCurrentUser = true }: UseVitalsProps = {}) => {
  const { user } = useAuth();
  const [vitals, setVitals] = useState<Vitals[]>([]);
  const [singleVital, setSingleVital] = useState<Vitals | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all vitals
  const fetchAllVitals = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // If filterByCurrentUser is true and user exists, filter by userId
      const options = filterByCurrentUser && user ? { userId: user.ID } : undefined;
      const data = await VitalsService.getAllVitals(options);

      // Apply limit if specified
      const limitedData = limit ? data.slice(0, limit) : data;
      setVitals(limitedData);
    } catch (err: any) {
      if (err.response?.status === 403) {
        setError('You do not have permission to access these vitals');
      } else {
        setError('Failed to fetch vitals data');
      }
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch a single vital by ID
  const fetchVitalById = async (vitalId: number) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await VitalsService.getVitals(vitalId);
      setSingleVital(data);
    } catch (err: any) {
      if (err.response?.status === 403) {
        setError('You do not have permission to view this vital data');
      } else if (err.response?.status === 404) {
        setError('Vital data not found');
      } else {
        setError('Failed to fetch vital data');
      }
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    if (id) {
      fetchVitalById(id);
    } else {
      fetchAllVitals();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // Prepare chart data for a specific vital type
  const prepareChartData = (vitalType: keyof Pick<Vitals, 'temperature' | 'humidity' | 'pulseRate' | 'lightIntensity'>) => {
    if (!vitals || vitals.length === 0) {
      // Return empty chart data if no vitals
      return {
        labels: [],
        datasets: [
          {
            label: vitalType.charAt(0).toUpperCase() + vitalType.slice(1),
            data: [],
            borderColor: 'rgb(0, 115, 255)',
            backgroundColor: 'rgba(0, 115, 255, 0.5)',
            tension: 0.3,
          },
        ],
      };
    }

    const last10Vitals = [...vitals].slice(0, 10).reverse();

    return {
      labels: last10Vitals.map(v => {
        try {
          const date = new Date(v.CreatedAt);
          if (isNaN(date.getTime())) {
            return 'Invalid';
          }
          return `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
        } catch (error) {
          console.error('Error formatting chart label date:', error);
          return 'Invalid';
        }
      }),
      datasets: [
        {
          label: vitalType.charAt(0).toUpperCase() + vitalType.slice(1),
          data: last10Vitals.map(v => v[vitalType]),
          borderColor: 'rgb(0, 115, 255)',
          backgroundColor: 'rgba(0, 115, 255, 0.5)',
          tension: 0.3,
        },
      ],
    };
  };

  // Format date for display
  const formatDate = (dateString: string | undefined, includeTime: boolean = true) => {
    if (!dateString) {
      return 'N/A';
    }

    try {
      const date = new Date(dateString);
      // Check if date is valid
      if (isNaN(date.getTime())) {
        return 'Invalid date';
      }

      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: includeTime ? 'short' : 'long',
        day: 'numeric',
        ...(includeTime && {
          hour: '2-digit',
          minute: '2-digit',
          second: includeTime === true ? undefined : '2-digit',
        }),
      }).format(date);
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid date';
    }
  };

  return {
    vitals,
    singleVital,
    isLoading,
    error,
    fetchAllVitals,
    fetchVitalById,
    prepareChartData,
    formatDate
  };
};

export default useVitals;
