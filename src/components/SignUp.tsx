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

  const inputClasses = "w-full pl-10 pr-4 py-3 border border-sky-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400/50 bg-sky-50/30 text-sky-700 placeholder-sky-400 transition-all duration-300";
  const errorClasses = "text-red-500 text-sm mt-1";
  const iconClasses = "absolute left-3 top-1/2 transform -translate-y-1/2 text-sky-400 w-5 h-5 transition-colors group-hover:text-sky-500";

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-sky-600 to-sky-400 bg-clip-text text-transparent">
          Create Account
        </h2>
        <p className="text-sky-600/70 mt-2">Join us for the best movie experience</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="relative group">
            <User className={iconClasses} />
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={inputClasses}
              required
            />
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-sky-400/20 to-sky-300/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </div>
          <div className="relative group">
            <User className={iconClasses} />
            <input
              type="text"
              placeholder="Surname"
              value={formData.surname}
              onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
              className={inputClasses}
              required
            />
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-sky-400/20 to-sky-300/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </div>
        </div>

        <div className="relative group">
          <Mail className={iconClasses} />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
              validateEmail(e.target.value);
            }}
            className={`${inputClasses} ${errors.email ? 'border-red-300' : ''}`}
            required
          />
          {errors.email && <p className={errorClasses}>{errors.email}</p>}
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-sky-400/20 to-sky-300/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        </div>

        <div className="relative group">
          <Lock className={iconClasses} />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => {
              setFormData({ ...formData, password: e.target.value });
              if (formData.confirmPassword) validatePasswords();
            }}
            className={`${inputClasses} ${errors.password ? 'border-red-300' : ''}`}
            required
          />
          {errors.password && <p className={errorClasses}>{errors.password}</p>}
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-sky-400/20 to-sky-300/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        </div>

        <div className="relative group">
          <Lock className={iconClasses} />
          <input
            type="password"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={(e) => {
              setFormData({ ...formData, confirmPassword: e.target.value });
              if (formData.password) validatePasswords();
            }}
            className={`${inputClasses} ${errors.confirmPassword ? 'border-red-300' : ''}`}
            required
          />
          {errors.confirmPassword && <p className={errorClasses}>{errors.confirmPassword}</p>}
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-sky-400/20 to-sky-300/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        </div>

        <div className="relative group">
          <Phone className={iconClasses} />
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
            className={`${inputClasses} ${errors.phoneNumber ? 'border-red-300' : ''}`}
            required
          />
          {errors.phoneNumber && <p className={errorClasses}>{errors.phoneNumber}</p>}
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-sky-400/20 to-sky-300/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        </div>

        <button
          type="submit"
          className="w-full relative group overflow-hidden px-4 py-3 rounded-lg font-semibold text-white shadow-lg shadow-sky-400/30 transition-all duration-300"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-sky-400 to-sky-500 transition-transform duration-300 group-hover:scale-105"></div>
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2),transparent 50%)]"></div>
          <span className="relative">Create Account</span>
        </button>
      </form>

      <div className="text-center">
        <p className="text-sky-600/70">
          Already have an account?{' '}
          <button
            onClick={onSwitch}
            className="text-sky-500 font-semibold hover:text-sky-600 transition-colors relative group"
          >
            Sign in
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-sky-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignUp;