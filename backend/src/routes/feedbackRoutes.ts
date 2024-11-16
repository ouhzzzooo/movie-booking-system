import { Router } from 'express';
import { submitFeedback } from '../controllers/feedbackController';
import { authenticateJWT, authorizeRoles } from '../middlewares/authMiddleware';

const router = Router();

router.post('/submit', authenticateJWT, authorizeRoles(['User']), submitFeedback);

export default router;