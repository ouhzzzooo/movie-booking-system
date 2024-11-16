import { Request, Response } from 'express';
import AppDataSource from '../config/ormconfig';
import { Feedback } from '../entities/Feedback';
import { User } from '../entities/User';
import { AuthenticatedRequest } from '../middlewares/authMiddleware';

export const submitFeedback = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const feedbackRepository = AppDataSource.getRepository(Feedback);
  const userRepository = AppDataSource.getRepository(User);

  const userId = req.user?.userId;
  const { message } = req.body;

  try {
    const user = await userRepository.findOne({ where: { userId } });
    if (!user) {
      res.status(400).json({ message: 'Invalid user' });
      return;
    }

    const feedback = feedbackRepository.create({
      message,
      user,
    });

    await feedbackRepository.save(feedback);
    res.status(201).json({ message: 'Feedback submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const getFeedbacks = async (req: Request, res: Response): Promise<void> => {
  const feedbackRepository = AppDataSource.getRepository(Feedback);

  try {
    const feedbacks = await feedbackRepository.find({ relations: ['user'] });
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};