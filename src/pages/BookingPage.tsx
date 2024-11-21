import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, ChevronRight, ChevronLeft, Clock } from 'lucide-react';
import { useShowtimeStore } from '../store/showtimeStore';
import { useMovieStore } from '../store/movieStore';
import { Movie, Showtime } from '../types';

const generateDates = (startDate: Date, count: number) => {
  return Array.from({ length: count }, (_, i) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    return {
      label: i === 0 ? 'TODAY' : date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase(),
      date: date.toLocaleDateString('en-US', { day: '2-digit', month: 'short' }).toUpperCase(),
      fullDate: date.toISOString().split('T')[0],
    };
  });
};

const DATES_PER_PAGE = 5;

const BookingPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { movies, fetchMovies } = useMovieStore();
  const { showtimes, fetchShowtimes } = useShowtimeStore();
  const [movie, setMovie] = useState<Movie | undefined>(undefined);
  const [startDate, setStartDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(generateDates(new Date(), DATES_PER_PAGE)[0]);

  useEffect(() => {
    fetchMovies();
    fetchShowtimes();
  }, [fetchMovies, fetchShowtimes]);

  useEffect(() => {
    const foundMovie = movies.find((m) => m.movieId === Number(id));
    setMovie(foundMovie);
  }, [movies, id]);

  if (!movie) return <div>Movie not found</div>;

  const currentDates = generateDates(startDate, DATES_PER_PAGE);

  const handleNextDates = () => {
    const newStartDate = new Date(startDate);
    newStartDate.setDate(startDate.getDate() + DATES_PER_PAGE);
    setStartDate(newStartDate);
  };

  const handlePrevDates = () => {
    const newStartDate = new Date(startDate);
    newStartDate.setDate(startDate.getDate() - DATES_PER_PAGE);
    setStartDate(newStartDate);
  };

  const canGoPrev = startDate > new Date();

  const filteredShowtimes = showtimes.filter(
    (showtime) =>
      showtime.movie.movieId === movie.movieId &&
      new Date(showtime.dateTime).toISOString().split('T')[0] === selectedDate.fullDate
  );

  const showtimesByCinema = filteredShowtimes.reduce(
    (acc: { [key: number]: Showtime[] }, showtime) => {
      const cinemaId = showtime.cinema.cinemaId;
      if (!acc[cinemaId]) {
        acc[cinemaId] = [];
      }
      acc[cinemaId].push(showtime);
      return acc;
    },
    {}
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      <div className="max-w-6xl mx-auto px-4 pt-8 pb-12">
        <div className="flex items-start justify-center gap-12">
          <img
            src={movie.image}
            alt={movie.name}
            className="w-72 h-96 object-cover rounded-lg shadow-soft"
          />
          <div className="pt-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-sky-600 to-sky-400 bg-clip-text text-transparent mb-4">
              {movie.name}
            </h1>
            <div className="space-y-2 text-lg text-sky-700">
              <p>Genre: {movie.genre}</p>
              <p className="flex items-center gap-2">
                Rate: {movie.rating}
                <Clock className="w-5 h-5 ml-2 text-sky-500" />
                {movie.duration} Mins
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-b border-sky-100 bg-white bg-opacity-50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-center gap-4 py-6">
            <button
              onClick={handlePrevDates}
              disabled={!canGoPrev}
              className={`text-sky-500 p-2 rounded-lg transition-colors ${
                canGoPrev ? 'hover:bg-sky-50' : 'opacity-50 cursor-not-allowed'
              }`}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {currentDates.map((date) => (
              <button
                key={date.fullDate}
                onClick={() => setSelectedDate(date)}
                className={`text-center transition-colors min-w-[100px] ${
                  selectedDate.fullDate === date.fullDate
                    ? 'text-sky-500'
                    : 'text-sky-400 hover:text-sky-600'
                }`}
              >
                <div className="font-medium text-sm">{date.label}</div>
                <div
                  className={`text-base mt-1 ${
                    selectedDate.fullDate === date.fullDate ? 'font-bold' : ''
                  }`}
                >
                  {date.date}
                </div>
                {selectedDate.fullDate === date.fullDate && (
                  <div className="h-1 bg-sky-500 rounded-full mt-2"></div>
                )}
              </button>
            ))}

            <button
              onClick={handleNextDates}
              className="text-sky-500 hover:bg-sky-50 p-2 rounded-lg transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {Object.entries(showtimesByCinema).map(([cinemaId, showtimes]) => {
          const cinema = showtimes[0].cinema; // All showtimes have the same cinema
          return (
            <div key={cinemaId} className="mb-8">
              <div className="bg-gradient-to-r from-sky-400 to-sky-500 text-white p-4 rounded-t-lg flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                <span className="font-semibold text-lg">{cinema.location}</span>
              </div>

              <div className="bg-white shadow-soft border border-t-0 rounded-b-lg">
                <div className="flex border-b border-sky-100">
                  <div className="w-48 p-6 border-r border-sky-100">
                    <h3 className="text-xl font-semibold text-sky-800">
                      {cinema.name}
                    </h3>
                  </div>
                  <div className="flex-1 p-6">
                    {/* Showtime Buttons */}
                    <div className="flex flex-wrap gap-4">
                      {showtimes.map((showtime) => {
                        const time = new Date(showtime.dateTime).toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit',
                        });

                        return (
                          <button
                            key={showtime.showtimeId}
                            onClick={() =>
                              navigate(
                                `/movies/${movie.movieId}/seats?showtimeId=${showtime.showtimeId}`
                              )
                            }
                            className="relative group overflow-hidden px-6 py-2 rounded-lg font-medium text-sky-500 border-2 border-sky-500 hover:text-white transition-colors duration-300"
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-sky-400 to-sky-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                            <span className="relative">{time}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* No Showtimes Available */}
        {filteredShowtimes.length === 0 && (
          <div className="text-center text-sky-500 mt-12">
            No showtimes available for this date.
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingPage;