import express from 'express';
import { createBooking, getUserBookings } from '../controllers/bookingController';
import { optionalAuthenticateUser } from '../middlewares/optionalAuthenticateUser';
import { authenticateUser } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/', optionalAuthenticateUser, createBooking);
router.get('/user', authenticateUser, getUserBookings);

export default router;