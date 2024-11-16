import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useAdminStore } from '../../store/adminStore';
import { ShowtimeFormData, Cinema } from '../../types';
import { axiosInstance } from '../../api/auth';

interface ShowtimeFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (showtimeData: ShowtimeFormData) => void;
}

const ShowtimeForm: React.FC<ShowtimeFormProps> = ({ isOpen, onClose, onSubmit }) => {
  const { movies, fetchMovies } = useAdminStore();
  const [cinemas, setCinemas] = useState<Cinema[]>([]);
  const [formData, setFormData] = useState<ShowtimeFormData>({
    movieId: 0,
    cinemaId: 0,
    dateTime: '',
  });

  useEffect(() => {
    fetchMovies();
    fetchCinemas();
  }, [fetchMovies]);

  const fetchCinemas = async () => {
    try {
      const response = await axiosInstance.get('/cinemas');
      const data = response.data;

      if (Array.isArray(data)) {
        setCinemas(data);
      } else if (data && Array.isArray(data.cinemas)) {
        setCinemas(data.cinemas);
      } else {
        console.error('Invalid data format:', data);
        setCinemas([]);
      }
    } catch (error) {
      console.error('Failed to fetch cinemas:', error);
      setCinemas([]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.movieId && formData.cinemaId && formData.dateTime) {
      onSubmit(formData);
      onClose();
      setFormData({
        movieId: 0,
        cinemaId: 0,
        dateTime: '',
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold text-gray-900 mb-6">Add New Showtime</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Movie Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Movie
            </label>
            <select
              value={formData.movieId}
              onChange={(e) =>
                setFormData({ ...formData, movieId: parseInt(e.target.value) })
              }
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            >
              <option value={0}>Choose a movie</option>
              {movies.map((movie) => (
                <option key={movie.movieId} value={movie.movieId}>
                  {movie.name}
                </option>
              ))}
            </select>
          </div>

          {/* Cinema Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Cinema
            </label>
            <select
              value={formData.cinemaId}
              onChange={(e) =>
                setFormData({ ...formData, cinemaId: parseInt(e.target.value) })
              }
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            >
              <option value={0}>Choose a cinema</option>
              {cinemas.map((cinema) => (
                <option key={cinema.cinemaId} value={cinema.cinemaId}>
                  {cinema.name}
                </option>
              ))}
            </select>
          </div>

          {/* Date & Time */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date & Time
            </label>
            <input
              type="datetime-local"
              value={formData.dateTime}
              onChange={(e) => setFormData({ ...formData, dateTime: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              Add Showtime
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShowtimeForm;