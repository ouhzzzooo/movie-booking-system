import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMovies } from '../api/auth';
import { Movie } from '../types';

interface MovieDropdownProps {
  onSelect?: () => void;
}

const MovieDropdown: React.FC<MovieDropdownProps> = ({ onSelect }) => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const moviesData = await getMovies();
        setMovies(moviesData);
      } catch (error) {
        console.error('Failed to fetch movies:', error);
      }
    };
    fetchMovies();
  }, []);

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <Link
            key={movie.movieId}
            to={`/movies/${movie.movieId}`}
            className="group space-y-2"
            onClick={onSelect}
          >
            <div className="aspect-[2/3] overflow-hidden rounded-lg">
              <img
                src={movie.image}
                alt={movie.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">{movie.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MovieDropdown;