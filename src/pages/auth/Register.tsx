import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Alert from '../../components/ui/Alert';
import Card from '../../components/ui/Card';
import useAuth from '../../hooks/useAuth';
import useForm from '../../hooks/useForm';
import { RegisterData } from '../../types';

interface RegisterFormValues extends RegisterData {
  confirmPassword: string;
}

const Register: React.FC = () => {
  // Custom hooks
  const { isLoading, error, setError, handleRegister, isAuthenticated } = useAuth();

  // Form validation function
  const validateForm = (values: RegisterFormValues) => {
    const errors: Record<string, string> = {};

    if (values.password !== values.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    if (values.password && values.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    return errors;
  };

  // Form handling
  const { values, handleChange, handleSubmit } = useForm<RegisterFormValues>({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      dateOfBirth: '',
      deviceId: '',
    },
    validate: validateForm,
    onSubmit: (formValues) => {
      const { confirmPassword, ...registerData } = formValues;
      handleRegister(registerData);
    }
  });

  // Redirect if already authenticated
  useEffect(() => {
    // This is now handled in the useAuth hook
  }, [isAuthenticated]);

  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary-50 to-white">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl transition-all duration-300 ease-in-out">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Create a new account
          </h1>
          <p className="mt-2 text-sm text-gray-600 sm:text-base">
            Or{' '}
            <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
              sign in to your existing account
            </Link>
          </p>
        </div>

        <Card className="shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
          {error && (
            <Alert
              type="error"
              message={error}
              onClose={() => setError(null)}
            />
          )}

          <form className="space-y-6 mt-4 px-2 sm:px-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Full Name"
                type="text"
                id="name"
                name="name"
                autoComplete="name"
                required
                value={values.name}
                onChange={handleChange}
                className="py-3"
              />

              <Input
                label="Email address"
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                required
                value={values.email}
                onChange={handleChange}
                className="py-3"
              />

              <Input
                label="Password"
                type="password"
                id="password"
                name="password"
                autoComplete="new-password"
                required
                value={values.password}
                onChange={handleChange}
                className="py-3"
              />

              <Input
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                autoComplete="new-password"
                required
                value={values.confirmPassword}
                onChange={handleChange}
                className="py-3"
              />

              <Input
                label="Date of Birth"
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                required
                value={values.dateOfBirth}
                onChange={handleChange}
                className="py-3"
              />

              <Input
                label="Device ID"
                type="text"
                id="deviceId"
                name="deviceId"
                required
                value={values.deviceId}
                onChange={handleChange}
                placeholder="Enter your IoT device ID"
                className="py-3"
              />
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                fullWidth
                size="lg"
                isLoading={isLoading}
                className="py-3"
              >
                Register
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Register;
