import { Router } from 'express';
import { getSeatsByShowtime } from '../controllers/seatController';

const router = Router();

// Public route
router.get('/showtime/:showtimeId', getSeatsByShowtime);

export default router;