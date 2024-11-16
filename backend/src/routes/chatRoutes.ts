import { Router } from 'express';
import { getChats, createChat } from '../controllers/chatController';
import { authenticateJWT, authorizeRoles } from '../middlewares/authMiddleware';

const router = Router();

router.use(authenticateJWT);
router.use(authorizeRoles(['Admin', 'Developer']));

router.get('/', getChats);
router.post('/', createChat);

export default router;