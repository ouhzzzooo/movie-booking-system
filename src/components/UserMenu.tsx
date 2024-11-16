import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCircle2, History, User, LogOut, MessageSquare } from 'lucide-react';
import { useUserStore } from '../store/userStore';
import AuthModal from './AuthModal';

const UserMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { user, logout } = useUserStore();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  return (
    <>
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => (user ? setIsOpen(!isOpen) : setIsAuthModalOpen(true))}
          className="flex items-center text-gray-900 hover:text-orange-500"
        >
          {user ? (
            <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center">
              {user.name[0].toUpperCase()}
            </div>
          ) : (
            <>
              <UserCircle2 className="h-6 w-6 mr-1" />
              <span>Login</span>
            </>
          )}
        </button>

        {isOpen && user && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
            <button
              onClick={() => {
                navigate('/booking-history');
                setIsOpen(false);
              }}
              className="w-full px-4 py-2 text-left hover:bg-orange-50 flex items-center gap-2"
            >
              <History className="w-4 h-4" />
              <span>Booking History</span>
            </button>
            <button
              onClick={() => {
                navigate('/profile');
                setIsOpen(false);
              }}
              className="w-full px-4 py-2 text-left hover:bg-orange-50 flex items-center gap-2"
            >
              <User className="w-4 h-4" />
              <span>Profile</span>
            </button>
            <button
              onClick={() => {
                navigate('/feedback');
                setIsOpen(false);
              }}
              className="w-full px-4 py-2 text-left hover:bg-orange-50 flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Feedback</span>
            </button>
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 text-left hover:bg-orange-50 flex items-center gap-2 text-red-500"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
};

export default UserMenu;