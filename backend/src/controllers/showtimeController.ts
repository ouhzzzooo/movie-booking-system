import { Request, Response } from 'express';
import AppDataSource from '../config/ormconfig';
import { Showtime } from '../entities/Showtime';
import { Movie } from '../entities/Movie';
import { Cinema } from '../entities/Cinema';

export const getShowtimes = async (req: Request, res: Response): Promise<void> => {
  const showtimeRepository = AppDataSource.getRepository(Showtime);

  try {
    const showtimes = await showtimeRepository.find({ relations: ['movie', 'cinema'] });
    res.json(showtimes);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const createShowtime = async (req: Request, res: Response): Promise<void> => {
  const showtimeRepository = AppDataSource.getRepository(Showtime);
  const movieRepository = AppDataSource.getRepository(Movie);
  const cinemaRepository = AppDataSource.getRepository(Cinema);
  const { dateTime, movieId, cinemaId } = req.body;

  try {
    const movie = await movieRepository.findOne({ where: { movieId: Number(movieId) } });
    const cinema = await cinemaRepository.findOne({ where: { cinemaId: Number(cinemaId) } });

    if (!movie || !cinema) {
      res.status(400).json({ message: 'Invalid movie or cinema ID' });
      return;
    }

    const showtime = showtimeRepository.create({
      dateTime,
      movie,
      cinema,
    });

    await showtimeRepository.save(showtime);
    res.status(201).json(showtime);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};