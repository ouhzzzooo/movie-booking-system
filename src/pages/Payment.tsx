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
      await createBooking({
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-center mb-8 text-orange-500">
          Payment
        </h1>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex gap-6">
            <img
              src={movie.image}
              alt={movie.name}
              className="w-32 rounded-lg"
            />
            <div>
              <h2 className="text-xl font-bold mb-2">{movie.name}</h2>
              <div className="space-y-1 text-sm text-gray-600">
                <p>Genre: {movie.genre}</p>
                <p className="flex items-center">
                  Rate: {movie.rating}
                  <Clock className="w-4 h-4 ml-2 mr-1" />
                  {movie.duration} Mins
                </p>
                {/* Include showtime and seat details if available */}
                <p className="text-orange-500">
                  Selected Seats:{' '}
                  {selectedSeatsData
                    .map((seat) => seat.seatNumber)
                    .join(', ')}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-6 text-orange-500 text-center">
            Confirmation
          </h3>

          <div className="space-y-4 mb-6">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              type="tel"
              placeholder="Mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <h3 className="text-lg font-semibold mb-4 text-orange-500 text-center">
            Selected Payment Method
          </h3>
          <div className="grid grid-cols-3 gap-4 mb-6">
            {PaymentMethods.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setSelectedMethod(id)}
                className={`p-4 rounded-lg border text-center transition-colors duration-200 flex flex-col items-center gap-2
                      ${
                        selectedMethod === id
                          ? 'border-orange-500 text-orange-500'
                          : 'border-gray-200 text-gray-600 hover:border-orange-200'
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
            className="w-full bg-gradient-to-r from-orange-400 to-orange-500 text-white py-3 rounded-lg font-semibold hover:from-orange-500 hover:to-orange-600 transition-all duration-200 disabled:from-gray-300 disabled:to-gray-300"
          >
            PAY ({totalAmount} THB)
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;