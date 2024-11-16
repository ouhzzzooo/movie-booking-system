import React, { useState } from 'react';
import { Mail, Lock } from 'lucide-react';
import { useUserStore } from '../store/userStore';

interface SignInProps {
  onSwitch: () => void;
  onClose: () => void;
}

const SignIn: React.FC<SignInProps> = ({ onSwitch, onClose }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const login = useUserStore((state) => state.login);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(formData.email, formData.password);
    if (success) {
      onClose();
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">Welcome Back!</h2>
        <p className="text-gray-500 mt-2">Please sign in to continue</p>
      </div>

      {error && (
        <p className="text-red-500 text-sm text-center">{error}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-orange-400 to-orange-500 text-white py-3 rounded-lg font-semibold hover:from-orange-500 hover:to-orange-600 transition-all duration-200"
        >
          Sign In
        </button>
      </form>

      <div className="text-center">
        <p className="text-gray-600">
          Don't have an account?{' '}
          <button
            onClick={onSwitch}
            className="text-orange-500 font-semibold hover:text-orange-600"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignIn;