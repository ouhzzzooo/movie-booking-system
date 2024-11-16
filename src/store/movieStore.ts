import { create } from 'zustand';
import { Movie } from '../types';
import { getMovies } from '../api/auth';

interface MovieStore {
  movies: Movie[];
  fetchMovies: () => Promise<void>;
}

export const useMovieStore = create<MovieStore>((set) => ({
  movies: [],
  fetchMovies: async () => {
    try {
      const movies = await getMovies();
      set({ movies });
    } catch (error) {
      console.error('Failed to fetch movies:', error);
    }
  },
}));