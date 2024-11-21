import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Clock } from 'lucide-react';
import SeatMap from '../components/SeatMap';
import { getSeatsByShowtime, getMovieById } from '../api/auth';
import { Seat, Movie } from '../types';

const SeatSelection: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const showtimeId = queryParams.get('showtimeId');

  const [seats, setSeats] = useState<Seat[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    if (showtimeId) {
      fetchSeats();
    }
    fetchMovie();
  }, [showtimeId]);

  const fetchSeats = async () => {
    try {
      const seatsData = await getSeatsByShowtime(showtimeId);
      setSeats(seatsData);
    } catch (error) {
      console.error('Failed to fetch seats:', error);
    }
  };

  const fetchMovie = async () => {
    try {
      const movieData = await getMovieById(id);
      setMovie(movieData);
    } catch (error) {
      console.error('Failed to fetch movie:', error);
    }
  };

  const calculateTotal = () => {
    return selectedSeats.reduce((total, seatId) => {
      const seat = seats.find((s) => s.seatId === seatId);
      return total + (['AA', 'BB'].includes(seat?.rowNumber ?? '') ? 500 : 200);
    }, 0);
  };

  const handleSeatSelect = (seatId: number) => {
    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((id) => id !== seatId)
        : [...prev, seatId]
    );
  };

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-8">
          <div className="flex-1">
            <SeatMap
              seats={seats}
              selectedSeats={selectedSeats}
              onSeatSelect={handleSeatSelect}
            />
          </div>
          <div className="w-80">
            <div className="bg-white rounded-lg shadow-soft p-6">
              <img
                src={movie.image}
                alt={movie.name}
                className="w-full rounded-lg mb-4"
              />
              <h2 className="text-xl font-bold text-sky-800 mb-2">{movie.name}</h2>
              <div className="space-y-2 text-sm text-sky-700 mb-4">
                <p>Genre: {movie.genre}</p>
                <p className="flex items-center">
                  Rate: {movie.rating}
                  <Clock className="w-4 h-4 ml-2 mr-1 text-sky-500" />
                  {movie.duration} Mins
                </p>
              </div>
              <div className="border-t pt-4">
                <p className="font-semibold mb-2">Selected Seats</p>
                <div className="space-y-2">
                  {selectedSeats.map((seatId) => {
                    const seat = seats.find((s) => s.seatId === seatId);
                    const isPremium = ['AA', 'BB'].includes(seat?.rowNumber ?? '');
                    return (
                      <div
                        key={seatId}
                        className="flex justify-between text-sky-500"
                      >
                        <span>{seat?.seatNumber}</span>
                        <span>{isPremium ? '500 THB' : '200 THB'}</span>
                      </div>
                    );
                  })}
                </div>
                <p className="font-semibold mt-4">Total</p>
                <p className="text-sky-500 text-xl font-bold">
                  {calculateTotal()} THB
                </p>
              </div>
              <button
                onClick={() =>
                  navigate(
                    `/movies/${id}/payment?showtimeId=${showtimeId}&seatIds=${selectedSeats.join(
                      ','
                    )}&totalAmount=${calculateTotal()}`
                  )
                }
                disabled={selectedSeats.length === 0}
                className="w-full relative group overflow-hidden px-4 py-3 rounded-lg font-semibold text-white shadow-lg shadow-sky-400/30 mt-6 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-sky-400 to-sky-500 transition-transform duration-300 group-hover:scale-105"></div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2),transparent 50%)]"></div>
                <span className="relative">Continue</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;