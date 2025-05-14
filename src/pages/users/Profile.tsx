import React from 'react';
import { useAuth } from '../../context/AuthContext';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Alert from '../../components/ui/Alert';
import useForm from '../../hooks/useForm';
import useUsers from '../../hooks/useUsers';
import { UpdateUserData, UserProfileFormData } from '../../types';

const Profile: React.FC = () => {
  const { user } = useAuth();
  const { isLoading, message, setMessage, updateUser } = useUsers();

  // Form validation function
  const validateForm = (values: UserProfileFormData) => {
    const errors: Record<string, string> = {};

    if (values.password && values.password !== values.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    if (values.password && values.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    return errors;
  };

  // Form handling
  const { values, handleChange, handleSubmit, setFieldValue } = useForm<UserProfileFormData>({
    initialValues: {
      name: user?.name || '',
      email: user?.email || '',
      dateOfBirth: user?.dateOfBirth || '',
      deviceId: user?.deviceId || '',
      password: '',
      confirmPassword: '',
    },
    validate: validateForm,
    onSubmit: async (formValues) => {
      if (!user) {
        setMessage({ type: 'error', text: 'User not found' });
        return;
      }

      // Only include fields that have been changed
      const updateData: UpdateUserData = {};
      if (formValues.name && formValues.name !== user.name) updateData.name = formValues.name;
      if (formValues.email && formValues.email !== user.email) updateData.email = formValues.email;
      if (formValues.dateOfBirth && formValues.dateOfBirth !== user.dateOfBirth) updateData.dateOfBirth = formValues.dateOfBirth;
      if (formValues.deviceId && formValues.deviceId !== user.deviceId) updateData.deviceId = formValues.deviceId;
      if (formValues.password) updateData.password = formValues.password;

      // Only make the API call if there are changes
      if (Object.keys(updateData).length > 0) {
        try {
          await updateUser(user.ID, updateData);
          // Clear password fields after successful update
          setFieldValue('password', '');
          setFieldValue('confirmPassword', '');
        } catch (err) {
          // Error is handled in the updateUser function
        }
      } else {
        setMessage({ type: 'error', text: 'No changes detected' });
      }
    }
  });

  if (!user) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-4">
        User not found. Please log in again.
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Your Profile</h1>
        <p className="text-gray-600">Manage your account information</p>
      </div>

      <Card>
        {message && (
          <Alert
            type={message.type}
            message={message.text}
            onClose={() => setMessage(null)}
          />
        )}

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Full Name"
              type="text"
              id="name"
              name="name"
              value={values.name}
              onChange={handleChange}
              required
            />

            <Input
              label="Email Address"
              type="email"
              id="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              required
            />

            <Input
              label="Date of Birth"
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={values.dateOfBirth}
              onChange={handleChange}
              required
            />

            <Input
              label="Device ID"
              type="text"
              id="deviceId"
              name="deviceId"
              value={values.deviceId}
              onChange={handleChange}
              required
            />

            <Input
              label="New Password (leave blank to keep current)"
              type="password"
              id="password"
              name="password"
              value={values.password}
              onChange={handleChange}
            />

            <Input
              label="Confirm New Password"
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={values.confirmPassword}
              onChange={handleChange}
              disabled={!values.password}
            />
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              isLoading={isLoading}
            >
              Save Changes
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Profile;
