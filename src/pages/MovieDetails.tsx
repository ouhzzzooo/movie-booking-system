import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock } from 'lucide-react';
import { Movie } from '../types';
import { getMovieById } from '../api/auth';

const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true);
      setError(null);

      try {
        if (id) {
          const movieData = await getMovieById(id);
          setMovie(movieData);
        }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError('Failed to fetch movie details.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;
  if (!movie) return <div className="text-center mt-8">Movie not found</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-soft overflow-hidden">
          <div className="flex flex-col md:flex-row gap-8 p-8">
            <div className="w-full md:w-1/3">
              <img
                src={movie.image}
                alt={movie.name}
                className="w-full rounded-lg shadow-lg"
              />
            </div>
            <div className="w-full md:w-2/3">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-sky-600 to-sky-400 bg-clip-text text-transparent mb-4">
                {movie.name}
              </h1>
              <div className="space-y-4 text-sky-700">
                <p>
                  <span className="font-semibold">Genre:</span> {movie.genre}
                </p>
                <p>
                  <span className="font-semibold">Rating:</span> {movie.rating}
                </p>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-sky-500" />
                  <span>{movie.duration} Mins</span>
                </div>
                <p>{movie.details}</p>
                <button
                  onClick={() => navigate(`/movies/${id}/booking`)}
                  className="relative group overflow-hidden px-8 py-3 rounded-lg font-semibold text-white shadow-lg shadow-sky-400/30 mt-4 transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-sky-400 to-sky-500 transition-transform duration-300 group-hover:scale-105"></div>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2),transparent 50%)]"></div>
                  <span className="relative">GET TICKETS</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;