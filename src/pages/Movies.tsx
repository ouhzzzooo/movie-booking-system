import React, { useEffect } from 'react';
import MovieList from '../components/MovieList';
import { useMovieStore } from '../store/movieStore';

const Movies: React.FC = () => {
  const { movies, fetchMovies } = useMovieStore();

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-900">
          Now Showing
        </h1>
        <MovieList movies={movies} />
      </div>
    </div>
  );
};

export default Movies;