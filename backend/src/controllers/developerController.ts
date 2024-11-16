import { Request, Response } from 'express';
import AppDataSource from '../config/ormconfig';
import { Admin } from '../entities/Admin';
import { Developer } from '../entities/Developer';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

export const developerLogin = async (req: Request, res: Response): Promise<void> => {
  const developerRepository = AppDataSource.getRepository(Developer);
  const { email, password } = req.body;

  try {
    const developer = await developerRepository.findOne({ where: { email } });

    if (!developer) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }

    const isValid = await bcrypt.compare(password, developer.password);

    if (!isValid) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }

    const token = jwt.sign(
      { developerId: developer.developerId, role: 'Developer' },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    );

    res.json({
      token,
      developer: {
        developerId: developer.developerId,
        name: developer.name,
        surname: developer.surname,
        email: developer.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const createDeveloper = async (req: Request, res: Response): Promise<void> => {
  const developerRepository = AppDataSource.getRepository(Developer);
  const { name, surname, email, password } = req.body;

  try {
    const existingDeveloper = await developerRepository.findOne({ where: { email } });
    if (existingDeveloper) {
      res.status(400).json({ message: 'Email already exists' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const developer = developerRepository.create({
      name,
      surname,
      email,
      password: hashedPassword,
    });

    await developerRepository.save(developer);

    res.status(201).json({ message: 'Developer created successfully' });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const createAdmin = async (req: Request, res: Response): Promise<void> => {
  const adminRepository = AppDataSource.getRepository(Admin);
  const { name, surname, email, password } = req.body;

  try {
    const existingAdmin = await adminRepository.findOne({ where: { email } });
    if (existingAdmin) {
      res.status(400).json({ message: 'Email already exists' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = adminRepository.create({
      name,
      surname,
      email,
      password: hashedPassword,
    });

    await adminRepository.save(admin);

    res.status(201).json({ message: 'Admin created successfully' });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const getAdmins = async (req: Request, res: Response): Promise<void> => {
  const adminRepository = AppDataSource.getRepository(Admin);

  try {
    const admins = await adminRepository.find({
      select: ['adminId', 'name', 'surname', 'email'],
    });
    res.json(admins);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const deleteAdmin = async (req: Request, res: Response): Promise<void> => {
  const adminRepository = AppDataSource.getRepository(Admin);
  const adminId = parseInt(req.params.adminId);

  try {
    const admin = await adminRepository.findOne({ where: { adminId } });
    if (!admin) {
      res.status(404).json({ message: 'Admin not found' });
      return;
    }

    await adminRepository.remove(admin);

    res.json({ message: 'Admin deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};