import React from 'react';
import { Link } from 'react-router-dom';
import { Movie } from '../types';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <Link to={`/movies/${movie.movieId}`} className="group animate-slideUp">
      <div className="bg-white rounded-xl shadow-soft overflow-hidden transition-all duration-500 hover:shadow-hover hover:-translate-y-2">
        <div className="aspect-[2/3] relative overflow-hidden">
          <img
            src={movie.image}
            alt={movie.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="absolute inset-0 opacity-0 group-hover:opacity-20">
            <div className="absolute inset-0 transform -translate-x-full bg-shimmer animate-shimmer" />
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
            <div className="text-white bg-gradient-to-t from-sky-500/90 to-sky-400/80 p-3 rounded-lg backdrop-blur-sm">
              <p className="font-medium">{movie.genre}</p>
              <p className="text-sm opacity-90">{movie.duration} mins</p>
            </div>
          </div>
        </div>
        <div className="p-4 bg-gradient-to-b from-white to-sky-50/30">
          <h3 className="text-center font-bold mt-2 text-sky-800 group-hover:text-sky-600 transition-all duration-300 group-hover:scale-105">
            {movie.name}
          </h3>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;