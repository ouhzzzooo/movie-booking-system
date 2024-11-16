import { Request, Response } from 'express';
import AppDataSource from '../config/ormconfig';
import { User } from '../entities/User';
import { Admin } from '../entities/Admin';
import { Movie } from '../entities/Movie';
import { Showtime } from '../entities/Showtime';
import { Feedback } from '../entities/Feedback';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { MoreThan } from 'typeorm';
import { Booking } from '../entities/Booking';

export const createAdmin = async (req: Request, res: Response): Promise<void> => {
  const adminRepository = AppDataSource.getRepository(Admin);
  const { name, surname, email, password } = req.body;

  try {

    const existingAdmin = await adminRepository.findOne({ where: { email } });
    if (existingAdmin) {
      res.status(400).json({ message: 'Email already exists' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = adminRepository.create({
      name,
      surname,
      email,
      password: hashedPassword,
    });

    await adminRepository.save(admin);

    res.status(201).json({ message: 'Admin created successfully' });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const loginAdmin = async (req: Request, res: Response): Promise<void> => {
  const adminRepository = AppDataSource.getRepository(Admin);
  const { email, password } = req.body;

  try {
    const admin = await adminRepository.findOne({ where: { email } });

    if (!admin) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }

    const isValid = await bcrypt.compare(password, admin.password);

    if (!isValid) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }

    const token = jwt.sign(
      { adminId: admin.adminId, role: 'Admin' },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    );

    res.json({
      token,
      adminId: admin.adminId,
      name: admin.name,
      surname: admin.surname,
      email: admin.email,
    });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  const userRepository = AppDataSource.getRepository(User);

  try {
    const users = await userRepository.find({
      select: ['userId', 'name', 'surname', 'email', 'phoneNumber'],
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const getMovies = async (req: Request, res: Response): Promise<void> => {
  const movieRepository = AppDataSource.getRepository(Movie);

  try {
    const movies = await movieRepository.find();
    res.json(movies);
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

    res.status(201).json({ message: 'Movie added successfully', movie });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const deleteMovie = async (req: Request, res: Response): Promise<void> => {
  const movieRepository = AppDataSource.getRepository(Movie);
  const movieId = parseInt(req.params.movieId);

  try {
    const movie = await movieRepository.findOne({ where: { movieId } });
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
  const { movieId, cinemaId, dateTime } = req.body;

  try {
    const showtime = showtimeRepository.create({
      movie: { movieId },
      cinema: { cinemaId },
      dateTime,
    });

    await showtimeRepository.save(showtime);

    res.status(201).json({ message: 'Showtime added successfully', showtime });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const deleteShowtime = async (req: Request, res: Response): Promise<void> => {
  const showtimeRepository = AppDataSource.getRepository(Showtime);
  const showtimeId = parseInt(req.params.showtimeId);

  try {
    const showtime = await showtimeRepository.findOne({ where: { showtimeId } });
    if (!showtime) {
      res.status(404).json({ message: 'Showtime not found' });
      return;
    }

    await showtimeRepository.remove(showtime);

    res.json({ message: 'Showtime deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const getFeedbacks = async (req: Request, res: Response): Promise<void> => {
  const feedbackRepository = AppDataSource.getRepository(Feedback);

  try {
    const feedbacks = await feedbackRepository.find({
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const getStats = async (req: Request, res: Response): Promise<void> => {
  const userRepository = AppDataSource.getRepository(User);
  const bookingRepository = AppDataSource.getRepository(Booking);
  const showtimeRepository = AppDataSource.getRepository(Showtime);

  try {
    const totalUsers = await userRepository.count();

    const activeBookings = await bookingRepository.count();

    const upcomingShowtimes = await showtimeRepository.count({
      where: { dateTime: MoreThan(new Date()) },
    });

    res.json({
      totalUsers,
      activeBookings,
      upcomingShowtimes,
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};