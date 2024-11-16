import { Request, Response } from 'express';
import AppDataSource from '../config/ormconfig';
import { Movie } from '../entities/Movie';

export const getMovies = async (req: Request, res: Response): Promise<void> => {
  const movieRepository = AppDataSource.getRepository(Movie);

  try {
    const movies = await movieRepository.find();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const getMovieById = async (req: Request, res: Response): Promise<void> => {
  const movieRepository = AppDataSource.getRepository(Movie);
  const { id } = req.params;

  try {
    const movie = await movieRepository.findOne({
      where: { movieId: Number(id) },
      relations: ['showtimes'],
    });
    if (!movie) {
      res.status(404).json({ message: 'Movie not found' });
      return;
    }
    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const createMovie = async (req: Request, res: Response): Promise<void> => {
  const movieRepository = AppDataSource.getRepository(Movie);
  const { name, genre, rating, duration, details, image } = req.body;

  try {
    const movie = movieRepository.create({
      name,
      genre,
      rating,
      duration,
      details,
      image,
    });

    await movieRepository.save(movie);
    res.status(201).json(movie);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const updateMovie = async (req: Request, res: Response): Promise<void> => {
  const movieRepository = AppDataSource.getRepository(Movie);
  const { id } = req.params;
  const { name, genre, rating, duration, details, image } = req.body;

  try {
    const movie = await movieRepository.findOne({ where: { movieId: Number(id) } });
    if (!movie) {
      res.status(404).json({ message: 'Movie not found' });
      return;
    }

    movie.name = name || movie.name;
    movie.genre = genre || movie.genre;
    movie.rating = rating || movie.rating;
    movie.duration = duration || movie.duration;
    movie.details = details || movie.details;
    movie.image = image || movie.image;

    await movieRepository.save(movie);
    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const deleteMovie = async (req: Request, res: Response): Promise<void> => {
  const movieRepository = AppDataSource.getRepository(Movie);
  const { id } = req.params;

  try {
    const movie = await movieRepository.findOne({ where: { movieId: Number(id) } });
    if (!movie) {
      res.status(404).json({ message: 'Movie not found' });
      return;
    }

    await movieRepository.remove(movie);
    res.json({ message: 'Movie deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};