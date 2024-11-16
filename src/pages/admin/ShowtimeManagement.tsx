import React, { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import ShowtimeForm from '../../components/admin/ShowtimeForm';
import { useAdminStore } from '../../store/adminStore';
import { ShowtimeFormData } from '../../types';

const ShowtimeManagement: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { showtimes, fetchShowtimes, addShowtime, removeShowtime } = useAdminStore();

  useEffect(() => {
    fetchShowtimes();
  }, [fetchShowtimes]);

  const handleAddShowtime = async (showtimeData: ShowtimeFormData) => {
    await addShowtime(showtimeData);
    setIsFormOpen(false);
  };

  const handleDeleteShowtime = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this showtime?')) {
      await removeShowtime(id);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Showtime Management</h1>
        <button
          onClick={() => setIsFormOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add New Showtime
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Movie</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Cinema</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Date & Time</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {showtimes.map((showtime) => (
                <tr key={showtime.showtimeId}>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {showtime.movie.name}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {showtime.cinema.name}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {new Date(showtime.dateTime).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <button
                      onClick={() => handleDeleteShowtime(showtime.showtimeId)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ShowtimeForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleAddShowtime}
      />
    </div>
  );
};

export default ShowtimeManagement;