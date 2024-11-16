import { Router } from 'express';
import {
  loginAdmin,
  createAdmin,
  getUsers,
  getMovies,
  createMovie,
  deleteMovie,
  getShowtimes,
  createShowtime,
  deleteShowtime,
  getFeedbacks,
  getStats,
} from '../controllers/adminController';
import { authenticateJWT, authorizeRoles } from '../middlewares/authMiddleware';

const router = Router();

router.post('/login', loginAdmin);
router.post('/create', createAdmin);
// Protected routes
router.use(authenticateJWT);
router.use(authorizeRoles(['Admin']));

// Admin management (only accessible by Admins)


// User Management
router.get('/users', getUsers);

// Stats Management
router.get('/stats', getStats);

// Movie Management
router.get('/movies', getMovies);
router.post('/movies', createMovie);
router.delete('/movies/:movieId', deleteMovie);

// Showtime Management
router.get('/showtimes', getShowtimes);
router.post('/showtimes', createShowtime);
router.delete('/showtimes/:showtimeId', deleteShowtime);

// Feedback Handling
router.get('/feedbacks', getFeedbacks);

export default router;