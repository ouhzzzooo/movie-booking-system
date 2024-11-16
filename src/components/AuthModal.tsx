import React, { useState } from 'react';
import { X } from 'lucide-react';
import SignIn from './SignIn';
import SignUp from './SignUp';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isSignUp, setIsSignUp] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>

        {isSignUp ? (
          <SignUp onSwitch={() => setIsSignUp(false)} onClose={onClose} />
        ) : (
          <SignIn onSwitch={() => setIsSignUp(true)} onClose={onClose} />
        )}
      </div>
    </div>
  );
};

export default AuthModal;