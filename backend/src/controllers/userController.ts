import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { User } from '../entities/User';
import AppDataSource from '../config/ormconfig';
import { validate } from 'class-validator';
import { AuthenticatedRequest } from '../middlewares/authMiddleware';
import { Booking } from '../entities/Booking';

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const userRepository = AppDataSource.getRepository(User);
  const { name, surname, email, password, phoneNumber } = req.body;

  try {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({ message: 'Invalid email format' });
      return;
    }

    if (password.length < 8) {
      res.status(400).json({ message: 'Password must be at least 8 characters' });
      return;
    }

    if (!/^\d{10}$/.test(phoneNumber)) {
      res.status(400).json({ message: 'Phone number must be 10 digits' });
      return;
    }

    const existingUser = await userRepository.findOne({ where: { email } });
    if (existingUser) {
      res.status(400).json({ message: 'Email already exists' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = userRepository.create({
      name,
      surname,
      email,
      password: hashedPassword,
      phoneNumber,
    });

    await userRepository.save(user);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const userRepository = AppDataSource.getRepository(User);
  const { email, password } = req.body;

  try {
    const user = await userRepository.findOne({ where: { email } });
    if (!user) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }

    const token = jwt.sign(
      { userId: user.userId, role: 'User' },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    );

    res.json({
      token,
      user: {
        userId: user.userId,
        name: user.name,
        surname: user.surname,
        email: user.email,
        phoneNumber: user.phoneNumber,
      },
    });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const getUserProfile = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const userRepository = AppDataSource.getRepository(User);
  const userId = req.user?.userId;

  try {
    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const user = await userRepository.findOne({
      where: { userId },
      select: ['userId', 'name', 'surname', 'email', 'phoneNumber'],
    });

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const updateUserProfile = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const userRepository = AppDataSource.getRepository(User);
  const userId = req.user?.userId;
  const { name, surname, phoneNumber } = req.body;

  try {
    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const user = await userRepository.findOne({ where: { userId } });
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    user.name = name || user.name;
    user.surname = surname || user.surname;
    user.phoneNumber = phoneNumber || user.phoneNumber;

    const errors = await validate(user);
    if (errors.length > 0) {
      res.status(400).json({ message: 'Validation failed', errors });
      return;
    }

    await userRepository.save(user);

    res.json({
      userId: user.userId,
      name: user.name,
      surname: user.surname,
      email: user.email,
      phoneNumber: user.phoneNumber,
    });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const getUserBookings = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
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