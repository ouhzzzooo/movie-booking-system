import React, { useEffect } from 'react';
import { Users, Film, Calendar, MessageSquare, FileText } from 'lucide-react';
import AdminLayout from './AdminLayout';
import StatsCard from '../../components/admin/StatsCard';
import ActionButton from '../../components/admin/ActionButton';
import { useAdminStore } from '../../store/adminStore';

const Dashboard: React.FC = () => {
  const { stats, fetchStats } = useAdminStore();

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const actions = [
    { label: 'User Management', icon: Users, path: '/admins/users' },
    { label: 'Movie Management', icon: Film, path: '/admins/movies' },
    { label: 'Showtime Management', icon: Calendar, path: '/admins/showtimes' },
    { label: 'Feedback Handling', icon: MessageSquare, path: '/admins/feedback' },
    { label: 'Generate Reports', icon: FileText, path: '/admins/reports' },
  ];

  return (
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatsCard label="Total Users" value={stats.totalUsers} icon={Users} />
          <StatsCard label="Active Bookings" value={stats.activeBookings} icon={Calendar} />
          <StatsCard label="Upcoming Showtimes" value={stats.upcomingShowtimes} icon={Film} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {actions.map((action) => (
            <ActionButton key={action.label} {...action} />
          ))}
        </div>
      </div>
  );
};

export default Dashboard;