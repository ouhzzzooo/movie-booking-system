import { Response } from 'express';
import { In } from 'typeorm';
import AppDataSource from '../config/ormconfig';
import { Booking } from '../entities/Booking';
import { User } from '../entities/User';
import { Showtime } from '../entities/Showtime';
import { Seat } from '../entities/Seat';
import { AuthenticatedRequest } from '../middlewares/authMiddleware';

export const createBooking = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  const bookingRepository = AppDataSource.getRepository(Booking);
  const userRepository = AppDataSource.getRepository(User);
  const showtimeRepository = AppDataSource.getRepository(Showtime);
  const seatRepository = AppDataSource.getRepository(Seat);

  const userId = req.user?.userId;
  const user = userId ? await userRepository.findOne({ where: { userId } }) : null;

  const { showtimeId, seatIds, paymentMethod, email, mobile } = req.body;

  try {
    const showtime = await showtimeRepository.findOne({ where: { showtimeId } });

    if (!showtime) {
      res.status(400).json({ message: 'Invalid showtime ID' });
      return;
    }

    const seats = await seatRepository.findByIds(seatIds);

    if (seats.length !== seatIds.length) {
      res.status(400).json({ message: 'Some seats are invalid' });
      return;
    }

    const existingBookings = await bookingRepository.find({
      where: {
        showtime: { showtimeId },
        seat: { seatId: In(seatIds) },
      },
    });

    if (existingBookings.length > 0) {
      res.status(400).json({ message: 'One or more seats are already booked' });
      return;
    }

    const bookings = seats.map((seat) =>
      bookingRepository.create({
        bookingDate: new Date(),
        paymentStatus: 'Pending',
        paymentMethod,
        email,
        mobile,
        user: user || undefined,
        showtime,
        seat,
      })
    );

    await bookingRepository.save(bookings);
    res.status(201).json(bookings);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const getUserBookings = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  const bookingRepository = AppDataSource.getRepository(Booking);
  const userId = req.user?.userId;

  try {
    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const bookings = await bookingRepository.find({
      where: { user: { userId } },
      relations: ['showtime', 'showtime.movie', 'showtime.cinema', 'seat'],
    });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};