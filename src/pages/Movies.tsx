import React, { useEffect } from 'react';
import MovieList from '../components/MovieList';
import { useMovieStore } from '../store/movieStore';

const Movies: React.FC = () => {
  const { movies, fetchMovies } = useMovieStore();

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-sky-600 to-sky-400 bg-clip-text text-transparent">
          Now Showing
        </h1>
        <MovieList movies={movies} />
      </div>
    </div>
  );
};

export default Movies;