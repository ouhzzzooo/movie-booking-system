import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import MovieDropdown from '../components/MovieDropdown';
import CinemaDropdown from '../components/CinemaDropdown';
import MovieList from '../components/MovieList';
import { useMovieStore } from '../store/movieStore';

const Home: React.FC = () => {
  const [activeDropdown, setActiveDropdown] = useState<'cinema' | 'movie' | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { movies, fetchMovies } = useMovieStore();

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-12" ref={dropdownRef}>
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <button
                onClick={() => setActiveDropdown(activeDropdown === 'cinema' ? null : 'cinema')}
                className={`w-full px-4 py-2 text-left border-b transition-colors ${
                  activeDropdown === 'cinema' ? 'border-orange-500 text-orange-500' : 'border-gray-200'
                }`}
              >
                All Cinema
              </button>
              {activeDropdown === 'cinema' && (
                <div className="absolute top-full left-0 right-0 mt-2 z-50">
                  <CinemaDropdown onSelect={() => setActiveDropdown(null)} />
                </div>
              )}
            </div>

            <div className="flex-1 relative">
              <button
                onClick={() => setActiveDropdown(activeDropdown === 'movie' ? null : 'movie')}
                className={`w-full px-4 py-2 text-left border-b transition-colors ${
                  activeDropdown === 'movie' ? 'border-orange-500 text-orange-500' : 'border-gray-200'
                }`}
              >
                Movie
              </button>
              {activeDropdown === 'movie' && (
                <div className="absolute top-full left-0 right-0 mt-2 z-50">
                  <MovieDropdown onSelect={() => setActiveDropdown(null)} />
                </div>
              )}
            </div>

            <Link
              to="/showtime"
              className="px-8 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              SHOWTIME
            </Link>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-orange-500 text-center mb-8">Movie</h2>
        <MovieList movies={movies} />
      </div>
    </div>
  );
};

export default Home;