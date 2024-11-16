import { create } from 'zustand';
import { Showtime } from '../types';
import { getShowtimes } from '../api/auth';

interface ShowtimeStore {
  showtimes: Showtime[];
  fetchShowtimes: () => Promise<void>;
}

export const useShowtimeStore = create<ShowtimeStore>((set) => ({
  showtimes: [],
  fetchShowtimes: async () => {
    try {
      const showtimes = await getShowtimes();
      set({ showtimes });
    } catch (error) {
      console.error('Failed to fetch showtimes:', error);
    }
  },
}));