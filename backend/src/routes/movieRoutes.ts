import { Router } from 'express';
import {
  getMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
} from '../controllers/movieController';
import { authenticateJWT, authorizeRoles } from '../middlewares/authMiddleware';

const router = Router();

// Public routes
router.get('/', getMovies);
router.get('/:id', getMovieById);

// Admin routes
router.post('/', authenticateJWT, authorizeRoles(['Admin']), createMovie);
router.put('/:id', authenticateJWT, authorizeRoles(['Admin']), updateMovie);
router.delete('/:id', authenticateJWT, authorizeRoles(['Admin']), deleteMovie);

export default router;