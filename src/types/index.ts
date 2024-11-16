export interface User {
  userId: number;
  name: string;
  surname: string;
  email: string;
  phoneNumber: string;
}

export interface Admin {
  adminId: number;
  name: string;
  surname: string;
  email: string;
}

export interface Developer {
  developerId: number;
  name: string;
  surname: string;
  email: string;
}

export interface Movie {
  movieId: number;
  name: string;
  genre: string;
  rating: string;
  duration: number;
  details: string;
  image: string;
}

export interface MovieFormData {
  name: string;
  genre: string;
  rating: string;
  duration: number;
  details: string;
  image: string;
}

export interface Cinema {
  cinemaId: number;
  name: string;
  location: string;
}

export interface Showtime {
  showtimeId: number;
  dateTime: string;
  movie: Movie;
  cinema: Cinema;
}

export interface ShowtimeFormData {
  movieId: number;
  cinemaId: number;
  dateTime: string;
}

export interface Seat {
  seatId: number;
  seatNumber: string;
  rowNumber: string;
  cinemaId: number;
  isAvailable: boolean;
}

export interface Booking {
  bookingId: number;
  bookingDate: string;
  paymentStatus: 'Pending' | 'Completed' | 'Failed';
  paymentMethod: string;
  email?: string;
  mobile?: string;
  showtime: Showtime;
  seat: Seat;
}

export interface Feedback {
  feedbackId: number;
  message: string;
  createdAt: string;
  user: User;
}

export interface ChatMessage {
  chatId: number;
  message: string;
  dateTime: string;
  admin?: Admin;
  developer?: Developer;
}