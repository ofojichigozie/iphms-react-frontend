import React from 'react';
import { Link } from 'react-router-dom';
import {
  HeartIcon,
  CloudIcon,
  SunIcon,
  FireIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../../context/AuthContext';
import Card from '../../components/ui/Card';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import useVitals from '../../hooks/useVitals';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard: React.FC = () => {
  const { user, isAdmin } = useAuth();
  // Use our custom hook to fetch vitals data for the current user
  const {
    vitals,
    isLoading,
    error,
    prepareChartData
  } = useVitals({
    filterByCurrentUser: true,
    limit: 10
  });

  // Get the latest vitals reading
  const latestVitals = vitals.length > 0 ? vitals[0] : null;

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: false,
      },
    },
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Welcome, {user?.name}</h1>
        {isAdmin ? (
          <p className="text-gray-600">Welcome to the admin dashboard. You can manage users and view their vitals data.</p>
        ) : (
          <p className="text-gray-600">Here's an overview of your health vitals</p>
        )}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-4 mb-6">
          {error}
        </div>
      )}

      {vitals.length === 0 ? (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-md p-4">
          {isAdmin ? (
            <>
              <p className="font-medium">Admin Dashboard</p>
              <p className="mt-2">As an administrator, you don't have personal vitals data. Use the navigation menu to access user management and view user vitals.</p>
              <div className="mt-4 flex items-center">
                <svg className="h-5 w-5 text-yellow-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm text-yellow-700">You can view all users' vitals from the Users section.</span>
              </div>
              <div className="mt-4">
                <Link to="/users" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                  Go to User Management
                </Link>
              </div>
            </>
          ) : (
            <>
              <p className="font-medium">No vitals data found for your account</p>
              <p className="mt-2">Please ensure your IoT device is properly connected and sending data. If you're using a new device, make sure it's registered with your account.</p>
              <div className="mt-4 flex items-center">
                <svg className="h-5 w-5 text-yellow-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm text-yellow-700">If this problem persists, please contact support.</span>
              </div>
            </>
          )}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-primary-50 to-white">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-primary-100 text-primary-600">
                  <FireIcon className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Temperature</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {latestVitals?.temperature.toFixed(1)}°C
                  </p>
                </div>
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-primary-50 to-white">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-primary-100 text-primary-600">
                  <CloudIcon className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Humidity</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {latestVitals?.humidity.toFixed(1)}%
                  </p>
                </div>
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-primary-50 to-white">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-primary-100 text-primary-600">
                  <HeartIcon className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Pulse Rate</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {latestVitals?.pulseRate.toFixed(0)} BPM
                  </p>
                </div>
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-primary-50 to-white">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-primary-100 text-primary-600">
                  <SunIcon className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Light Intensity</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {latestVitals?.lightIntensity.toFixed(0)} lux
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card title="Temperature Trend">
              <div className="h-64">
                <Line
                  options={chartOptions}
                  data={prepareChartData('temperature')}
                />
              </div>
            </Card>

            <Card title="Pulse Rate Trend">
              <div className="h-64">
                <Line
                  options={chartOptions}
                  data={prepareChartData('pulseRate')}
                />
              </div>
            </Card>
          </div>

          <div className="text-right">
            <Link
              to="/vitals"
              className="text-primary-600 hover:text-primary-800 font-medium"
            >
              View all vitals history →
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
