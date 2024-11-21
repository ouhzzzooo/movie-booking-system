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
        <h2 className="text-2xl font-bold bg-gradient-to-r from-sky-600 to-sky-400 bg-clip-text text-transparent">
          Welcome Back!
        </h2>
        <p className="text-sky-600/70 mt-2">Please sign in to continue</p>
      </div>

      {error && (
        <p className="text-red-500 text-sm text-center bg-red-50 py-2 rounded-lg">{error}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <div className="relative group">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sky-400 w-5 h-5 transition-colors group-hover:text-sky-500" />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full pl-10 pr-4 py-3 border border-sky-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400/50 bg-sky-50/30 text-sky-700 placeholder-sky-400 transition-all duration-300"
              required
            />
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-sky-400/20 to-sky-300/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="relative group">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sky-400 w-5 h-5 transition-colors group-hover:text-sky-500" />
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full pl-10 pr-4 py-3 border border-sky-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400/50 bg-sky-50/30 text-sky-700 placeholder-sky-400 transition-all duration-300"
              required
            />
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-sky-400/20 to-sky-300/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full relative group overflow-hidden px-4 py-3 rounded-lg font-semibold text-white shadow-lg shadow-sky-400/30 transition-all duration-300"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-sky-400 to-sky-500 transition-transform duration-300 group-hover:scale-105"></div>
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2),transparent 50%)]"></div>
          <span className="relative">Sign In</span>
        </button>
      </form>

      <div className="text-center">
        <p className="text-sky-600/70">
          Don't have an account?{' '}
          <button
            onClick={onSwitch}
            className="text-sky-500 font-semibold hover:text-sky-600 transition-colors relative group"
          >
            Sign up
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-sky-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignIn;