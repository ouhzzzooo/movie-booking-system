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
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white flex flex-col">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-soft p-6 mb-12" ref={dropdownRef}>
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <button
                onClick={() => setActiveDropdown(activeDropdown === 'cinema' ? null : 'cinema')}
                className={`w-full px-4 py-2 text-left border-b transition-colors ${
                  activeDropdown === 'cinema' ? 'border-sky-500 text-sky-500' : 'border-sky-200'
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
                  activeDropdown === 'movie' ? 'border-sky-500 text-sky-500' : 'border-sky-200'
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
              className="px-8 py-2 bg-gradient-to-r from-sky-400 to-sky-500 text-white rounded-lg hover:from-sky-500 hover:to-sky-600 transition-colors shadow-button"
            >
              SHOWTIME
            </Link>
          </div>
        </div>

        <div className="relative">
          <h2 className="text-2xl font-bold text-sky-500 text-center mb-8">Movie</h2>
          <MovieList movies={movies} />
        </div>
      </div>

      <footer className="mt-auto py-6 bg-gradient-to-r from-sky-50 to-white">
        <div className="text-center text-sky-600/70">
          <p className="font-medium">© 2024 FS Cinema. All rights reserved.</p>
          <p className="text-sm mt-1">Developed by Pongsakorn</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;