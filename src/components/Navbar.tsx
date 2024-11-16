import React from 'react';
import { Link } from 'react-router-dom';
import UserMenu from './UserMenu';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-orange-500">FS</span>
              <span className="text-sm text-gray-500 ml-1">CINEMA</span>
            </Link>
            <div className="ml-10 flex space-x-8">
              <Link to="/" className="text-gray-900 hover:text-orange-500 px-3 py-2">
                Home
              </Link>
              <Link to="/movies" className="text-gray-900 hover:text-orange-500 px-3 py-2">
                Movie
              </Link>
              <Link to="/cinemas" className="text-gray-900 hover:text-orange-500 px-3 py-2">
                Cinema
              </Link>
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