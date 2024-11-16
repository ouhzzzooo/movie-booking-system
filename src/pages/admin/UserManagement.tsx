import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import AdminLayout from './AdminLayout';
import { useAdminStore } from '../../store/adminStore';

const UserManagement: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { users, fetchUsers } = useAdminStore();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">User Management</h1>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">UserID</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Name</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Email</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.userId}>
                    <td className="px-4 py-3 text-sm text-gray-900">{user.userId}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{user.name} {user.surname}</td>
                    <td className="px-4 py-3 text-sm text-gray-900">{user.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
  );
};

export default UserManagement;