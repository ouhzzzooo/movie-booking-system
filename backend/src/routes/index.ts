import { Router } from 'express';
import userRoutes from './userRoutes';
import adminRoutes from './adminRoutes';
import developerRoutes from './developerRoutes';
import movieRoutes from './movieRoutes';
import showtimeRoutes from './showtimeRoutes';
import bookingRoutes from './bookingRoutes';
import feedbackRoutes from './feedbackRoutes';
import cinemaRoutes from './cinemaRoutes';
import seatRoutes from './seatRoutes';
import chatRoutes from './chatRoutes';

const router = Router();

router.use('/users', userRoutes);
router.use('/admins', adminRoutes);
router.use('/developers', developerRoutes);
router.use('/movies', movieRoutes);
router.use('/showtimes', showtimeRoutes);
router.use('/seats', seatRoutes);
router.use('/bookings', bookingRoutes);
router.use('/feedbacks', feedbackRoutes);
router.use('/cinemas', cinemaRoutes);
router.use('/chat', chatRoutes);

export default router;