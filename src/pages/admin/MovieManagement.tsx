import React, { useEffect, useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import MovieForm from '../../components/admin/MovieForm';
import { useAdminStore } from '../../store/adminStore';
import { MovieFormData } from '../../types';

const MovieManagement: React.FC = () => {
  const [isMovieFormOpen, setIsMovieFormOpen] = useState(false);
  const { movies, fetchMovies, addMovie, removeMovie } = useAdminStore();

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const handleAddMovie = async (movieData: MovieFormData) => {
    await addMovie(movieData);
    setIsMovieFormOpen(false);
  };

  const handleDeleteMovie = async (movieId: number) => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      await removeMovie(movieId);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Movie Management</h1>
        <button
          onClick={() => setIsMovieFormOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add New Movie
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">MovieID</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Name</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Genre</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Rating</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Duration</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {movies.map((movie) => (
                <tr key={movie.movieId}>
                  <td className="px-4 py-3 text-sm text-gray-900">{movie.movieId}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{movie.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{movie.genre}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{movie.rating}</td>
                  <td className="px-4 py-3 text-sm text-gray-900">{movie.duration} mins</td>
                  <td className="px-4 py-3 text-sm">
                    <div className="flex gap-2">
                      {/* Implement edit functionality if needed */}
                      <button
                        onClick={() => handleDeleteMovie(movie.movieId)}
                        className="text-red-500 hover:text-red-600"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <MovieForm
        isOpen={isMovieFormOpen}
        onClose={() => setIsMovieFormOpen(false)}
        onSubmit={handleAddMovie}
      />
    </div>
  );
};

export default MovieManagement;