// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Request, Response } from 'express';
import AppDataSource from '../config/ormconfig';
import { Chat } from '../entities/Chat';
import { Admin } from '../entities/Admin';
import { Developer } from '../entities/Developer';
import { AuthenticatedRequest } from '../middlewares/authMiddleware';

export const getChats = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const chatRepository = AppDataSource.getRepository(Chat);

  try {
    const chats = await chatRepository.find({
      relations: ['admin', 'developer'],
      order: { dateTime: 'ASC' },
    });
    res.json(chats);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const createChat = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const chatRepository = AppDataSource.getRepository(Chat);
  const { message } = req.body;
  const user = req.user;

  try {
    const chat = chatRepository.create({
      message,
      dateTime: new Date(),
    });

    if (user?.role === 'Admin' && user.adminId) {
      chat.admin = { adminId: user.adminId } as Admin;
    } else if (user?.role === 'Developer' && user.developerId) {
      chat.developer = { developerId: user.developerId } as Developer;
    } else {
      res.status(403).json({ message: 'Unauthorized' });
      return;
    }

    await chatRepository.save(chat);
    res.status(201).json(chat);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};