import { Request, Response } from 'express';
import AppDataSource from '../config/ormconfig';
import { Cinema } from '../entities/Cinema';

export const getCinemas = async (req: Request, res: Response): Promise<void> => {
  const cinemaRepository = AppDataSource.getRepository(Cinema);

  try {
    const cinemas = await cinemaRepository.find();
    res.json(cinemas);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const getCinemaById = async (req: Request, res: Response): Promise<void> => {
  const cinemaRepository = AppDataSource.getRepository(Cinema);
  const { id } = req.params;

  try {
    const cinema = await cinemaRepository.findOne({
      where: { cinemaId: Number(id) },
      relations: ['showtimes'],
    });
    if (!cinema) {
      res.status(404).json({ message: 'Cinema not found' });
      return;
    }
    res.json(cinema);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const createCinema = async (req: Request, res: Response): Promise<void> => {
  const cinemaRepository = AppDataSource.getRepository(Cinema);
  const { name, location } = req.body;

  try {
    const cinema = cinemaRepository.create({
      name,
      location,
    });

    await cinemaRepository.save(cinema);
    res.status(201).json(cinema);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};