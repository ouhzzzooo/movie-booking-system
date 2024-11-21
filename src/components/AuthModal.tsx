import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import SignIn from './SignIn';
import SignUp from './SignUp';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isSignUp, setIsSignUp] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 min-h-screen flex items-center justify-center bg-black/40 transition-all duration-300"
      onClick={onClose}
      style={{ marginTop: 0 }}
    >
      <div 
        className="relative w-full max-w-md mx-4 animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative bg-white rounded-2xl shadow-soft p-8">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-sky-400 hover:text-sky-600 transition-colors"
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
    </div>
  );
};

export default AuthModal;