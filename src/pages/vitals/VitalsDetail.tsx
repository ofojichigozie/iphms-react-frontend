import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import {
  HeartIcon,
  CloudIcon,
  SunIcon,
  FireIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';
import useVitals from '../../hooks/useVitals';
import { useAuth } from '../../context/AuthContext';

const VitalsDetail: React.FC = () => {
  const { isAdmin } = useAuth();
  const { id } = useParams<{ id: string }>();
  // Ensure id is a valid number
  const vitalId = id && !isNaN(parseInt(id)) ? parseInt(id) : undefined;

  // Use our custom hook to fetch and manage vitals data
  const { singleVital: vitals, isLoading, error, formatDate } = useVitals({
    id: vitalId,
    // Admin can view any vitals, regular users only their own
    filterByCurrentUser: !isAdmin
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error || !vitals) {
    return (
      <div>
        <div className="mb-6 flex items-center">
          <Link to="/vitals" className="mr-4">
            <Button variant="outline" size="sm">
              <ArrowLeftIcon className="h-4 w-4 mr-1" />
              Back to Vitals
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Vitals Detail</h1>
        </div>

        <div className={`${error && error.includes('permission') ? 'bg-red-50 border-red-200 text-red-800' : 'bg-yellow-50 border-yellow-200 text-yellow-800'} border rounded-md p-4`}>
          <p className="font-medium">{error || (isAdmin ? 'Vitals data not found' : 'No vitals data found')}</p>

          {!error && !isAdmin && (
            <p className="mt-2">Please ensure your IoT device is connected and sending data.</p>
          )}

          {!error && isAdmin && (
            <p className="mt-2">The requested vitals record could not be found. It may have been deleted or the ID is invalid.</p>
          )}

          {error && error.includes('permission') && !isAdmin && (
            <p className="mt-2">You can only view your own vitals data.</p>
          )}

          {error && error.includes('permission') && isAdmin && (
            <p className="mt-2">There was an issue accessing this vitals data. Please try again.</p>
          )}

          <div className="mt-4 flex items-center">
            <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm">
              {isAdmin
                ? 'Return to the users list to view available vitals data.'
                : 'If this problem persists, please contact support.'}
            </span>
          </div>

          {isAdmin && (
            <div className="mt-4">
              <Link to="/users" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                Back to User Management
              </Link>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center">
        <Link to="/vitals" className="mr-4">
          <Button variant="outline" size="sm">
            <ArrowLeftIcon className="h-4 w-4 mr-1" />
            Back to Vitals
          </Button>
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Vitals Detail</h1>
      </div>

      <div className="mb-6">
        <Card>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 pb-4 border-b">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Reading #{vitals.ID}</h2>
              <p className="text-gray-600">{formatDate(vitals.CreatedAt)}</p>
            </div>
            <div className="mt-2 sm:mt-0">
              <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                Recorded
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center p-4 bg-primary-50 rounded-lg">
              <div className="p-3 rounded-full bg-primary-100 text-primary-600">
                <FireIcon className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Temperature</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {vitals.temperature.toFixed(1)}°C
                </p>
                <p className="text-sm text-gray-500">
                  {vitals.temperature < 36.5
                    ? 'Below normal range'
                    : vitals.temperature > 37.5
                    ? 'Above normal range'
                    : 'Normal range'}
                </p>
              </div>
            </div>

            <div className="flex items-center p-4 bg-primary-50 rounded-lg">
              <div className="p-3 rounded-full bg-primary-100 text-primary-600">
                <CloudIcon className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Humidity</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {vitals.humidity.toFixed(1)}%
                </p>
                <p className="text-sm text-gray-500">
                  {vitals.humidity < 30
                    ? 'Low humidity'
                    : vitals.humidity > 60
                    ? 'High humidity'
                    : 'Optimal humidity'}
                </p>
              </div>
            </div>

            <div className="flex items-center p-4 bg-primary-50 rounded-lg">
              <div className="p-3 rounded-full bg-primary-100 text-primary-600">
                <HeartIcon className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Pulse Rate</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {vitals.pulseRate.toFixed(0)} BPM
                </p>
                <p className="text-sm text-gray-500">
                  {vitals.pulseRate < 60
                    ? 'Below normal range'
                    : vitals.pulseRate > 100
                    ? 'Above normal range'
                    : 'Normal range'}
                </p>
              </div>
            </div>

            <div className="flex items-center p-4 bg-primary-50 rounded-lg">
              <div className="p-3 rounded-full bg-primary-100 text-primary-600">
                <SunIcon className="h-6 w-6" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Light Intensity</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {vitals.lightIntensity.toFixed(0)} lux
                </p>
                <p className="text-sm text-gray-500">
                  {vitals.lightIntensity < 300
                    ? 'Low light'
                    : vitals.lightIntensity > 1000
                    ? 'Bright light'
                    : 'Moderate light'}
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default VitalsDetail;
