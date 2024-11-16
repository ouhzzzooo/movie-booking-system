import { create } from 'zustand';
import { User, Booking } from '../types';
import {
  login as apiLogin,
  register as apiRegister,
  getUserBookings,
  updateUserProfile,
  submitFeedback,
} from '../api/auth';

interface UserState {
  user: User | null;
  token: string | null;
  bookings: Booking[];
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: {
    name: string;
    surname: string;
    email: string;
    password: string;
    phoneNumber: string;
  }) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => Promise<void>;
  fetchBookings: () => Promise<void>;
  submitFeedback: (message: string) => Promise<void>;
}

export const useUserStore = create<UserState>((set, get) => {
  const tokenFromStorage = localStorage.getItem('token');
  const userFromStorage = localStorage.getItem('user');

  return {
    user: userFromStorage ? JSON.parse(userFromStorage) : null,
    token: tokenFromStorage || null,
    bookings: [],
    login: async (email, password) => {
      try {
        const response = await apiLogin(email, password);
        const { token, user } = response;
        set({ user, token });
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        await get().fetchBookings();
        return true;
      } catch (error) {
        console.error('Login error:', error);
        return false;
      }
    },
    register: async (userData) => {
      try {
        await apiRegister(
          userData.name,
          userData.surname,
          userData.email,
          userData.password,
          userData.phoneNumber
        );
        const success = await get().login(userData.email, userData.password);
        return success;
      } catch (error) {
        console.error('Registration error:', error);
        return false;
      }
    },
    logout: () => {
      set({ user: null, token: null, bookings: [] });
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
    updateProfile: async (updates) => {
      try {
        const { user } = get();
        if (!user) return;
        const updatedUser = await updateUserProfile(updates);
        const newUser = { ...user, ...updatedUser };
        set({ user: newUser });
        localStorage.setItem('user', JSON.stringify(newUser));
      } catch (error) {
        console.error('Update profile error:', error);
      }
    },
    fetchBookings: async () => {
      try {
        const bookings = await getUserBookings();
        set({ bookings });
      } catch (error) {
        console.error('Fetch bookings error:', error);
      }
    },
    submitFeedback: async (message) => {
      try {
        await submitFeedback(message);
      } catch (error) {
        console.error('Failed to submit feedback:', error);
      }
    },
  };
});