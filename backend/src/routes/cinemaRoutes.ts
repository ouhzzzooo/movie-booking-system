import { Router } from 'express';
import {
  getCinemas,
  getCinemaById,
  createCinema,
} from '../controllers/cinemaController';
import { authenticateJWT, authorizeRoles } from '../middlewares/authMiddleware';

const router = Router();

// Public routes
router.get('/', getCinemas);
router.get('/:id', getCinemaById);

// Admin route
router.post('/', authenticateJWT, authorizeRoles(['Admin']), createCinema);

export default router;