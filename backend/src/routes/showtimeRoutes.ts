import { Router } from 'express';
import {
  getShowtimes,
  createShowtime,
} from '../controllers/showtimeController';
import { authenticateJWT, authorizeRoles } from '../middlewares/authMiddleware';

const router = Router();

// Public route
router.get('/', getShowtimes);

// Admin route
router.post('/', authenticateJWT, authorizeRoles(['Admin']), createShowtime);

export default router;