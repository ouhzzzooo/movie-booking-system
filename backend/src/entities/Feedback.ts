import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from './User';

@Entity()
export class Feedback {
  @PrimaryGeneratedColumn()
  feedbackId!: number;

  @Column()
  message!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @ManyToOne(() => User, (user) => user.feedbacks)
  user!: User;
}