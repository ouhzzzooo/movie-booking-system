import { create } from 'zustand';
import {
  adminLogin,
  getUsers,
  getAdminMovies,
  createAdminMovie,
  deleteAdminMovie,
  getChatMessages,
  postChatMessage,
  getAdminFeedbacks,
  getAdminShowtimes,
  createAdminShowtime,
  deleteAdminShowtime,
  axiosInstance,
} from '../api/auth';
import {
  User,
  Movie,
  MovieFormData,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Developer,
  Feedback,
  Showtime,
  ShowtimeFormData,
  ChatMessage,
  Admin,
} from '../types';

interface AdminState {
  admin: Admin | null;
  token: string | null;
  users: User[];
  movies: Movie[];
  showtimes: Showtime[];
  messages: ChatMessage[];
  feedbacks: Feedback[];
  stats: {
    totalUsers: number;
    activeBookings: number;
    upcomingShowtimes: number;
  };
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  fetchUsers: () => Promise<void>;
  fetchMovies: () => Promise<void>;
  addMovie: (movieData: MovieFormData) => Promise<void>;
  removeMovie: (movieId: number) => Promise<void>;
  fetchShowtimes: () => Promise<void>;
  addShowtime: (showtimeData: ShowtimeFormData) => Promise<void>;
  removeShowtime: (showtimeId: number) => Promise<void>;
  fetchChats: () => Promise<void>;
  sendMessage: (message: string) => Promise<void>;
  fetchFeedbacks: () => Promise<void>;
  fetchStats: () => Promise<void>;
}

const tokenFromStorage = localStorage.getItem('adminToken');
const adminDataFromStorage = localStorage.getItem('adminData');
const adminFromStorage = adminDataFromStorage ? JSON.parse(adminDataFromStorage) : null;

export const useAdminStore = create<AdminState>((set, get) => ({
  admin: adminFromStorage,
  token: tokenFromStorage || null,
  users: [],
  movies: [],
  showtimes: [],
  messages: [], 
  feedbacks: [],
  stats: {
    totalUsers: 0,
    activeBookings: 0,
    upcomingShowtimes: 0,
  },
  login: async (email, password) => {
    try {
      const data = await adminLogin(email, password);
      const { token, adminId, name, surname, email: adminEmail } = data;
      const adminData = { adminId, name, surname, email: adminEmail };

      set({ admin: adminData, token });

      localStorage.setItem('adminToken', token);
      localStorage.setItem('adminData', JSON.stringify(adminData));

      return true;
    } catch (error) {
      console.error('Admin login failed:', error);
      return false;
    }
  },
  logout: () => {
    set({
      admin: null,
      token: null,
      users: [],
      movies: [],
      showtimes: [],
      messages: [], 
      feedbacks: [],
      stats: {
        totalUsers: 0,
        activeBookings: 0,
        upcomingShowtimes: 0,
      },
    });
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
  },
  fetchUsers: async () => {
    try {
      const users = await getUsers();
      set({ users });
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  },
  fetchMovies: async () => {
    try {
      const movies = await getAdminMovies();
      set({ movies });
    } catch (error) {
      console.error('Failed to fetch movies:', error);
    }
  },
  addMovie: async (movieData) => {
    try {
      await createAdminMovie(movieData);
      await get().fetchMovies();
    } catch (error) {
      console.error('Failed to add movie:', error);
    }
  },
  removeMovie: async (movieId) => {
    try {
      await deleteAdminMovie(movieId);
      await get().fetchMovies();
    } catch (error) {
      console.error('Failed to delete movie:', error);
    }
  },
  fetchShowtimes: async () => {
    try {
      const showtimes = await getAdminShowtimes();
      set({ showtimes });
    } catch (error) {
      console.error('Failed to fetch showtimes:', error);
    }
  },
  addShowtime: async (showtimeData) => {
    try {
      await createAdminShowtime(showtimeData);
      await get().fetchShowtimes();
    } catch (error) {
      console.error('Failed to add showtime:', error);
    }
  },
  removeShowtime: async (showtimeId) => {
    try {
      await deleteAdminShowtime(showtimeId);
      await get().fetchShowtimes();
    } catch (error) {
      console.error('Failed to delete showtime:', error);
    }
  },
  fetchChats: async () => {
    try {
      const messages = await getChatMessages();
      set({ messages });
    } catch (error) {
      console.error('Failed to fetch chats:', error);
    }
  },
  sendMessage: async (message) => {
    try {
      await postChatMessage(message);
      await get().fetchChats();
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  },
  fetchFeedbacks: async () => {
    try {
      const feedbacks = await getAdminFeedbacks();
      set({ feedbacks });
    } catch (error) {
      console.error('Failed to fetch feedbacks:', error);
    }
  },
  fetchStats: async () => {
    try {
      const response = await axiosInstance.get('/admins/stats');
      set({ stats: response.data });
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  },
}));