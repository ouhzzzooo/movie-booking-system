import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import {
  Home,
  Users,
  Film,
  Calendar,
  MessageSquare,
  FileText,
  LogOut,
} from 'lucide-react';
import { useAdminStore } from '../../store/adminStore';

interface NavItem {
  label: string;
  path: string;
  icon: React.ElementType;
}

const AdminLayout: React.FC = () => {
  const location = useLocation();
  const { logout } = useAdminStore();

  const navItems: NavItem[] = [
    { label: 'Dashboard', path: '/admins/dashboard', icon: Home },
    { label: 'Users', path: '/admins/users', icon: Users },
    { label: 'Movies', path: '/admins/movies', icon: Film },
    { label: 'Showtimes', path: '/admins/showtimes', icon: Calendar },
    { label: 'Feedback', path: '/admins/feedback', icon: MessageSquare },
    { label: 'Chat', path: '/admins/chat', icon: MessageSquare },
    { label: 'Reports', path: '/admins/reports', icon: FileText },
  ];

  const handleLogout = () => {
    logout();
    window.location.href = '/admins/login';
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md relative">
        <div className="p-6">
          <Link to="/admins/dashboard" className="flex items-center">
            <span className="text-2xl font-bold text-orange-500">FS</span>
            <span className="text-sm text-gray-500 ml-1">ADMIN</span>
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
            onClick={handleLogout}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 w-full px-6 py-3"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;