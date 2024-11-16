import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Admin } from './Admin';
import { Developer } from './Developer';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn()
  chatId!: number;

  @Column()
  message!: string;

  @Column()
  dateTime!: Date;

  @ManyToOne(() => Admin, (admin) => admin.chats, { nullable: true })
  @JoinColumn({ name: 'adminId' })
  admin?: Admin;

  @ManyToOne(() => Developer, (developer) => developer.chats, { nullable: true })
  @JoinColumn({ name: 'developerId' })
  developer?: Developer;
}