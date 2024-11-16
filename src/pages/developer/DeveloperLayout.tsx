import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Users, MessageSquare, Home, LogOut } from 'lucide-react';
import { useDeveloperStore } from '../../store/developerStore';

interface NavItem {
  label: string;
  path: string;
  icon: React.ElementType;
}

const DeveloperLayout: React.FC = () => {
  const location = useLocation();
  const { logout } = useDeveloperStore();

  const navItems: NavItem[] = [
    { label: 'Dashboard', path: '/developer/dashboard', icon: Home },
    { label: 'Admin Management', path: '/developer/admin-management', icon: Users },
    { label: 'Chat', path: '/developer/chat', icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md relative">
        <div className="p-6">
          <Link to="/developer/dashboard" className="flex items-center">
            <span className="text-2xl font-bold text-orange-500">FS</span>
            <span className="text-sm text-gray-500 ml-1">DEVELOPER</span>
          </Link>
        </div>

        <nav className="mt-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-6 py-3 text-sm ${
                  isActive
                    ? 'text-orange-500 bg-orange-50 border-r-4 border-orange-500'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t">
          <button
            onClick={() => {
              logout();
              window.location.href = '/developers/login';
            }}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 w-full px-6 py-3"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default DeveloperLayout;