import React, { useState } from 'react';
import { useUserStore } from '../store/userStore';

const Profile: React.FC = () => {
  const { user, updateProfile } = useUserStore();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    surname: user?.surname || '',
    phoneNumber: user?.phoneNumber || ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState('');

  if (!user) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile(formData);
    setIsEditing(false);
    setMessage('Profile updated successfully');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Profile</h1>

        {message && (
          <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg">
            {message}
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-orange-500 text-white flex items-center justify-center text-2xl">
                {user.name[0].toUpperCase()}
              </div>
              <div>
                <h2 className="text-xl font-bold">{`${user.name} ${user.surname}`}</h2>
                <p className="text-gray-500">{user.email}</p>
              </div>
            </div>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 text-orange-500 border border-orange-500 rounded-lg hover:bg-orange-50 transition-colors"
              >
                Edit Profile
              </button>
            )}
          </div>

          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Surname
                </label>
                <input
                  type="text"
                  value={formData.surname}
                  onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-500">Name</label>
                <p className="mt-1">{user.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Surname</label>
                <p className="mt-1">{user.surname}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">Phone Number</label>
                <p className="mt-1">{user.phoneNumber}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;