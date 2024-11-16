import React, { useEffect } from 'react';
import { useUserStore } from '../store/userStore';
import { MapPin, Calendar, Clock } from 'lucide-react';

const BookingHistory: React.FC = () => {
  const { bookings, fetchBookings } = useUserStore();

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Booking History</h1>

        {bookings.length === 0 ? (
          <p>You have no bookings.</p>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <div key={booking.bookingId} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="flex">
                  <div className="w-1/3">
                    <img
                      src={booking.showtime.movie.image}
                      alt={booking.showtime.movie.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 p-6">
                    <h2 className="text-xl font-bold mb-4">{booking.showtime.movie.name}</h2>

                    <div className="space-y-3 text-gray-600">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-orange-500" />
                        <span>{booking.showtime.cinema.name}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-orange-500" />
                        <span>{new Date(booking.showtime.dateTime).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-orange-500" />
                        <span>{new Date(booking.showtime.dateTime).toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}</span>
                      </div>

                      <div className="mt-4">
                        <span className="font-semibold">Seat: </span>
                        <span className="text-orange-500">{booking.seat.rowNumber}{booking.seat.seatNumber}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingHistory;