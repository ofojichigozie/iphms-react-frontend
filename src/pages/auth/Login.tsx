import React from 'react';
import { Link } from 'react-router-dom';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Alert from '../../components/ui/Alert';
import Card from '../../components/ui/Card';
import useAuth from '../../hooks/useAuth';
import useForm from '../../hooks/useForm';
import { LoginData } from '../../types';

const Login: React.FC = () => {
  // Custom hooks
  const { isLoading, error, setError, handleLogin } = useAuth();

  // Form handling
  const { values, handleChange, handleSubmit } = useForm<LoginData>({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (loginData) => {
      handleLogin(loginData);
    }
  });

  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary-50 to-white">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl transition-all duration-300 ease-in-out">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Sign in to your account
          </h1>
          <p className="mt-2 text-sm text-gray-600 sm:text-base">
            Or{' '}
            <Link to="/register" className="font-medium text-primary-600 hover:text-primary-500">
              create a new account
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
            <div className="grid grid-cols-1 gap-6">
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
                autoComplete="current-password"
                required
                value={values.password}
                onChange={handleChange}
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
                Sign in
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Login;
