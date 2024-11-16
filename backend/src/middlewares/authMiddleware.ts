import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import AppDataSource from '../config/ormconfig';
import { User } from '../entities/User';
import { Admin } from '../entities/Admin';
import { Developer } from '../entities/Developer';

export interface UserWithRole {
  userId?: number;
  adminId?: number;
  developerId?: number;
  role: 'User' | 'Admin' | 'Developer';
}

export interface AuthenticatedRequest extends Request {
  user?: UserWithRole;
}

export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as UserWithRole;
    (req as AuthenticatedRequest).user = decoded;
    next();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    res.status(403).json({ message: 'Invalid token' });
  }
};

export const authorizeRoles = (roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const user = (req as AuthenticatedRequest).user;

    if (!user || !user.role || !roles.includes(user.role)) {
      res.status(403).json({ message: 'Forbidden' });
      return;
    }

    const userRepository = AppDataSource.getRepository(User);
    const adminRepository = AppDataSource.getRepository(Admin);
    const developerRepository = AppDataSource.getRepository(Developer);

    if (user.role === 'User' && user.userId) {
      const fullUser = await userRepository.findOne({ where: { userId: user.userId } });
      if (!fullUser) {
        res.status(401).json({ message: 'Invalid token' });
        return;
      }
      (req as AuthenticatedRequest).user = { ...fullUser, role: 'User' };
    } else if (user.role === 'Admin' && user.adminId) {
      const fullAdmin = await adminRepository.findOne({ where: { adminId: user.adminId } });
      if (!fullAdmin) {
        res.status(401).json({ message: 'Invalid token' });
        return;
      }
      (req as AuthenticatedRequest).user = { ...fullAdmin, role: 'Admin' };
    } else if (user.role === 'Developer' && user.developerId) {
      const fullDeveloper = await developerRepository.findOne({ where: { developerId: user.developerId } });
      if (!fullDeveloper) {
        res.status(401).json({ message: 'Invalid token' });
        return;
      }
      (req as AuthenticatedRequest).user = { ...fullDeveloper, role: 'Developer' };
    } else {
      res.status(403).json({ message: 'Forbidden' });
      return;
    }

    next();
  };
};

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as UserWithRole;
    const userRepository = AppDataSource.getRepository(User);

    if (decoded.role === 'User' && decoded.userId) {
      const user = await userRepository.findOne({ where: { userId: decoded.userId } });
      if (!user) {
        res.status(401).json({ message: 'Invalid token' });
        return;
      }
      (req as AuthenticatedRequest).user = { ...user, role: 'User' };
    } else {
      res.status(403).json({ message: 'Forbidden' });
      return;
    }

    next();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    res.status(403).json({ message: 'Invalid token' });
  }
};