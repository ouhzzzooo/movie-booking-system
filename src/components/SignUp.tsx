import React, { useState } from 'react';
import { Mail, Lock, User, Phone } from 'lucide-react';
import { useUserStore } from '../store/userStore';

interface SignUpProps {
  onSwitch: () => void;
  onClose: () => void;
}

const SignUp: React.FC<SignUpProps> = ({ onSwitch, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: ''
  });

  const [errors, setErrors] = useState({
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: ''
  });

  const register = useUserStore((state) => state.register);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrors(prev => ({ ...prev, email: 'Please enter a valid email address' }));
      return false;
    }
    setErrors(prev => ({ ...prev, email: '' }));
    return true;
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
      setErrors(prev => ({ ...prev, phoneNumber: 'Phone number must be 10 digits' }));
      return false;
    }
    setErrors(prev => ({ ...prev, phoneNumber: '' }));
    return true;
  };

  const validatePasswords = () => {
    if (formData.password.length < 8) {
      setErrors(prev => ({ ...prev, password: 'Password must be at least 8 characters' }));
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setErrors(prev => ({ ...prev, confirmPassword: 'Passwords do not match' }));
      return false;
    }
    setErrors(prev => ({ ...prev, password: '', confirmPassword: '' }));
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isEmailValid = validateEmail(formData.email);
    const isPhoneValid = validatePhone(formData.phoneNumber);
    const arePasswordsValid = validatePasswords();

    if (isEmailValid && isPhoneValid && arePasswordsValid) {
      const success = await register({
        name: formData.name,
        surname: formData.surname,
        email: formData.email,
        password: formData.password,
        phoneNumber: formData.phoneNumber,
      });

      if (success) {
        onClose();
      } else {
        setErrors((prev) => ({ ...prev, email: 'Registration failed' }));
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
        <p className="text-gray-500 mt-2">Join us for the best movie experience</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Surname"
              value={formData.surname}
              onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>
        </div>

        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
              validateEmail(e.target.value);
            }}
            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
              errors.email ? 'border-red-500' : ''
            }`}
            required
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => {
              setFormData({ ...formData, password: e.target.value });
              if (formData.confirmPassword) validatePasswords();
            }}
            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
              errors.password ? 'border-red-500' : ''
            }`}
            required
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="password"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={(e) => {
              setFormData({ ...formData, confirmPassword: e.target.value });
              if (formData.password) validatePasswords();
            }}
            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
              errors.confirmPassword ? 'border-red-500' : ''
            }`}
            required
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
          )}
        </div>

        <div className="relative">
          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="tel"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, '');
              setFormData({ ...formData, phoneNumber: value });
              validatePhone(value);
            }}
            maxLength={10}
            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
              errors.phoneNumber ? 'border-red-500' : ''
            }`}
            required
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-orange-400 to-orange-500 text-white py-3 rounded-lg font-semibold hover:from-orange-500 hover:to-orange-600 transition-all duration-200"
        >
          Create Account
        </button>
      </form>

      <div className="text-center">
        <p className="text-gray-600">
          Already have an account?{' '}
          <button
            onClick={onSwitch}
            className="text-orange-500 font-semibold hover:text-orange-600"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignUp;