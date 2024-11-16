import { Request, Response } from 'express';
import AppDataSource from '../config/ormconfig';
import { Seat } from '../entities/Seat';
import { Booking } from '../entities/Booking';
import { Showtime } from '../entities/Showtime';

export const getSeatsByShowtime = async (req: Request, res: Response): Promise<void> => {
  const seatRepository = AppDataSource.getRepository(Seat);
  const bookingRepository = AppDataSource.getRepository(Booking);
  const { showtimeId } = req.params;

  try {
    const showtime = await AppDataSource.getRepository(Showtime).findOne({
      where: { showtimeId: Number(showtimeId) },
      relations: ['cinema'],
    });

    if (!showtime) {
      res.status(404).json({ message: 'Showtime not found' });
      return;
    }

    const seats = await seatRepository.find({
      where: { cinema: { cinemaId: showtime.cinema.cinemaId } },
    });

    const bookings = await bookingRepository.find({
      where: { showtime: { showtimeId: Number(showtimeId) } },
      relations: ['seat'],
    });

    const bookedSeatIds = bookings.map((booking) => booking.seat.seatId);

    const seatsWithAvailability = seats.map((seat) => ({
      ...seat,
      isAvailable: !bookedSeatIds.includes(seat.seatId),
    }));

    res.json(seatsWithAvailability);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};