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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="flex flex-col md:flex-row gap-8 p-8">
            <div className="w-full md:w-1/3">
              <img
                src={movie.image}
                alt={movie.name}
                className="w-full rounded-lg shadow-md"
              />
            </div>
            <div className="w-full md:w-2/3">
              <h1 className="text-3xl font-bold mb-4">{movie.name}</h1>
              <div className="space-y-4">
                <p className="text-gray-600">
                  <span className="font-semibold">Genre:</span> {movie.genre}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Rating:</span> {movie.rating}
                </p>
                <div className="flex items-center text-gray-600">
                  <Clock className="w-5 h-5 mr-2" />
                  <span>{movie.duration} Mins</span>
                </div>
                <p className="text-gray-600">{movie.details}</p>
                <button
                  onClick={() => navigate(`/movies/${id}/booking`)}
                  className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors duration-200 flex items-center gap-2"
                >
                  GET TICKETS
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