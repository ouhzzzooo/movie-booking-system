import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  UserCircle2,
  History,
  User,
  LogOut,
  MessageSquare
} from 'lucide-react';
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
    navigate('/');
  };

  const menuItems = [
    { icon: History, label: 'Booking History', path: '/booking-history' },
    { icon: User, label: 'Profile', path: '/profile' },
    { icon: MessageSquare, label: 'Feedback', path: '/feedback' },
    { icon: LogOut, label: 'Logout', action: handleLogout, className: 'text-red-500 hover:bg-red-50' }
  ];

  return (
    <>
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => (user ? setIsOpen(!isOpen) : setIsAuthModalOpen(true))}
          className="flex items-center text-sky-700 hover:text-sky-500 transition-all duration-300 group"
        >
          {user ? (
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-sky-400 to-sky-500 text-white flex items-center justify-center shadow-soft transform group-hover:scale-110 transition-all duration-300">
              {user.name[0].toUpperCase()}
            </div>
          ) : (
            <>
              <UserCircle2 className="h-6 w-6 mr-1 transition-transform duration-300 group-hover:scale-110" />
              <span className="relative">
                Login
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-sky-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </span>
            </>
          )}
        </button>

        {isOpen && user && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-soft py-2 animate-fadeIn">
            {menuItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  if (item.action) {
                    item.action();
                  } else {
                    navigate(item.path);
                    setIsOpen(false);
                  }
                }}
                className={`w-full px-4 py-2 text-left hover:bg-sky-50 flex items-center gap-2 transition-all duration-200 ${
                  item.className || 'text-sky-700'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            ))}
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