import { Router } from 'express';
import {
  developerLogin,
  createDeveloper,
  createAdmin,
  getAdmins,
  deleteAdmin,
} from '../controllers/developerController';
import { authenticateJWT, authorizeRoles } from '../middlewares/authMiddleware';

const router = Router();

// Developer login
router.post('/login', developerLogin);

// Create Developer (accessible without authentication to allow initial setup)
router.post('/create', createDeveloper);

// Protected routes (accessible only by Developers)
router.use(authenticateJWT);
router.use(authorizeRoles(['Developer']));

router.post('/admins', createAdmin);
router.get('/admins', getAdmins);
router.delete('/admins/:adminId', deleteAdmin);

export default router;