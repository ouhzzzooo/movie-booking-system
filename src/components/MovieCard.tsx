import React from 'react';
import { Link } from 'react-router-dom';
import { Movie } from '../types';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <Link to={`/movies/${movie.movieId}`} className="group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-200 hover:scale-105">
        <div className="aspect-[2/3] relative">
          <img
            src={movie.image}
            alt={movie.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4">
          <p className="text-center text-orange-500 font-medium">
            {movie.genre}
          </p>
          <h3 className="text-center font-bold mt-2">{movie.name}</h3>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;