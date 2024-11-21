import React from 'react';
import { Link } from 'react-router-dom';
import UserMenu from './UserMenu';

const Navbar: React.FC = () => {
  return (
    <nav
      className="bg-gradient-to-r from-sky-50 to-pastel-blue shadow-soft sticky top-0 backdrop-blur-sm z-40"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link
              to="/"
              className="flex-shrink-0 flex items-center group transition-all duration-300 hover:scale-105"
            >
              <span className="text-3xl font-bold bg-gradient-to-r from-sky-400 to-sky-600 bg-clip-text text-transparent group-hover:from-sky-500 group-hover:to-sky-700 transition-all duration-300">
                FS
              </span>
              <span className="text-base text-sky-600 ml-1 opacity-80 group-hover:opacity-100">
                CINEMA
              </span>
            </Link>
            <div className="ml-10 flex space-x-8">
              {['Home', 'Movies', 'Cinemas'].map((item) => (
                <Link
                  key={item}
                  to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                  className="text-sky-700 hover:text-sky-500 px-3 py-2 text-base font-medium transition-all duration-300 relative group"
                >
                  <span className="relative z-10">{item}</span>
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-sky-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                  <span className="absolute inset-0 bg-sky-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></span>
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center">
            <UserMenu />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;