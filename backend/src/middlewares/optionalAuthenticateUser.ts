import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import AppDataSource from '../config/ormconfig';
import { User } from '../entities/User';
import { AuthenticatedRequest, UserWithRole } from './authMiddleware';

export const optionalAuthenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as UserWithRole;
      const userRepository = AppDataSource.getRepository(User);

      if (decoded.role === 'User' && decoded.userId) {
        const user = await userRepository.findOne({ where: { userId: decoded.userId } });
        if (user) {
          (req as AuthenticatedRequest).user = { ...user, role: 'User' };
        }
      }
    } catch (error) {
      console.error('Invalid token in optional authentication:', error);
    }
  }

  next();
};