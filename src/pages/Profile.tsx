import React, { useState } from 'react';
import { useUserStore } from '../store/userStore';

const Profile: React.FC = () => {
  const { user, updateProfile } = useUserStore();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    surname: user?.surname || '',
    phoneNumber: user?.phoneNumber || '',
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
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white flex flex-col">
      <div className="max-w-3xl mx-auto px-4 py-8 flex-grow">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-sky-600 to-sky-400 bg-clip-text text-transparent mb-8">
          Profile
        </h1>

        {message && (
          <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg animate-fadeIn">
            {message}
          </div>
        )}

        <div className="bg-white rounded-lg shadow-soft p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-sky-400 to-sky-500 text-white flex items-center justify-center text-2xl shadow-soft">
                {user.name[0].toUpperCase()}
              </div>
              <div>
                <h2 className="text-xl font-bold text-sky-800">
                  {`${user.name} ${user.surname}`}
                </h2>
                <p className="text-sky-600">{user.email}</p>
              </div>
            </div>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 text-sky-500 border border-sky-500 rounded-lg hover:bg-sky-50 transition-colors"
              >
                Edit Profile
              </button>
            )}
          </div>

          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-sky-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-sky-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 bg-sky-50 text-sky-700"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-sky-700 mb-1">
                  Surname
                </label>
                <input
                  type="text"
                  value={formData.surname}
                  onChange={(e) =>
                    setFormData({ ...formData, surname: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-sky-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 bg-sky-50 text-sky-700"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-sky-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, phoneNumber: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-sky-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 bg-sky-50 text-sky-700"
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
                  className="px-4 py-2 bg-gradient-to-r from-sky-400 to-sky-500 text-white rounded-lg hover:from-sky-500 hover:to-sky-600 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-sky-500">
                  Name
                </label>
                <p className="mt-1 text-sky-700">{user.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-sky-500">
                  Surname
                </label>
                <p className="mt-1 text-sky-700">{user.surname}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-sky-500">
                  Phone Number
                </label>
                <p className="mt-1 text-sky-700">{user.phoneNumber}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;