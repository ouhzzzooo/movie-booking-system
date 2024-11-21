import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { CreditCard, Building2, Wallet, Clock } from 'lucide-react';
import { getMovieById, createBooking, getSeatsByShowtime } from '../api/auth';
import { Movie, Seat } from '../types';
import { useUserStore } from '../store/userStore'; 

const PaymentMethods = [
  { id: 'credit', label: 'Credit / Debit', icon: CreditCard },
  { id: 'banking', label: 'Mobile Banking', icon: Building2 },
  { id: 'shopee', label: 'Shopee Pay', icon: Wallet },
];

const Payment: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { token } = useUserStore();

  const queryParams = new URLSearchParams(location.search);
  const showtimeId = queryParams.get('showtimeId');
  const seatIdsParam = queryParams.get('seatIds');
  const totalAmount = queryParams.get('totalAmount');

  const [movie, setMovie] = useState<Movie | null>(null);
  const [selectedMethod, setSelectedMethod] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [selectedSeatsData, setSelectedSeatsData] = useState<Seat[]>([]);

  const seatIds = seatIdsParam ? seatIdsParam.split(',').map(Number) : [];

  useEffect(() => {
    if (showtimeId) {
      fetchSeats();
    }
    fetchMovie();
  }, [showtimeId, id]);

  const fetchSeats = async () => {
    try {
      const seatsData = await getSeatsByShowtime(showtimeId);
      const selectedSeatsInfo = seatsData.filter((seat: Seat) =>
        seatIds.includes(seat.seatId)
      );
      setSelectedSeatsData(selectedSeatsInfo);
    } catch (error) {
      console.error('Failed to fetch seats:', error);
    }
  };

  const fetchMovie = async () => {
    try {
      if (id) {
        const movieData = await getMovieById(id);
        setMovie(movieData);
      }
    } catch (error) {
      console.error('Failed to fetch movie:', error);
    }
  };

  const handlePayment = async () => {
    try {
      await createBooking(
        {
          showtimeId: Number(showtimeId),
          seatIds,
          paymentMethod: selectedMethod,
          totalAmount: Number(totalAmount),
          email,
          mobile,
        },
        token
      );
      navigate('/booking-success');
    } catch (error) {
      console.error('Payment failed:', error);
    }
  };

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white py-8">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-center mb-8 bg-gradient-to-r from-sky-600 to-sky-400 bg-clip-text text-transparent">
          Payment
        </h1>

        <div className="bg-white rounded-lg shadow-soft p-6 mb-8">
          <div className="flex gap-6">
            <img
              src={movie.image}
              alt={movie.name}
              className="w-32 rounded-lg"
            />
            <div>
              <h2 className="text-xl font-bold text-sky-800 mb-2">{movie.name}</h2>
              <div className="space-y-1 text-sky-600">
                <p>Genre: {movie.genre}</p>
                <p className="flex items-center">
                  Rate: {movie.rating}
                  <Clock className="w-4 h-4 ml-2 mr-1 text-sky-500" />
                  {movie.duration} Mins
                </p>
                {/* Include showtime and seat details if available */}
                <p className="text-sky-500">
                  Selected Seats:{' '}
                  {selectedSeatsData
                    .map((seat) => seat.seatNumber)
                    .join(', ')}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-soft p-6">
          <h3 className="text-lg font-semibold text-sky-500 text-center mb-6">
            Confirmation
          </h3>

          <div className="space-y-4 mb-6">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-sky-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400/50 bg-sky-50/30 text-sky-700 placeholder-sky-400"
            />
            <input
              type="tel"
              placeholder="Mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="w-full px-4 py-2 border border-sky-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400/50 bg-sky-50/30 text-sky-700 placeholder-sky-400"
            />
          </div>

          <h3 className="text-lg font-semibold text-sky-500 text-center mb-4">
            Selected Payment Method
          </h3>
          <div className="grid grid-cols-3 gap-4 mb-6">
            {PaymentMethods.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setSelectedMethod(id)}
                className={`p-4 rounded-lg border text-center transition-all duration-200 flex flex-col items-center gap-2
                  ${
                    selectedMethod === id
                      ? 'border-sky-500 text-sky-500 bg-sky-50'
                      : 'border-sky-200 text-sky-600 hover:border-sky-300 hover:bg-sky-50/50'
                  }`}
              >
                <Icon className="w-6 h-6" />
                <span className="text-sm">{label}</span>
              </button>
            ))}
          </div>

          <button
            disabled={!selectedMethod || !email || !mobile}
            onClick={handlePayment}
            className="w-full relative group overflow-hidden px-4 py-3 rounded-lg font-semibold text-white shadow-lg shadow-sky-400/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-sky-400 to-sky-500 transition-transform duration-300 group-hover:scale-105"></div>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_50%)]"></div>
            <span className="relative">PAY ({totalAmount} THB)</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;