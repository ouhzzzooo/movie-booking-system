// /entities/Admin.ts

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Chat } from './Chat';

@Entity()
export class Admin {
  @PrimaryGeneratedColumn()
  adminId!: number;

  @Column()
  name!: string;

  @Column()
  surname!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @OneToMany(() => Chat, (chat) => chat.admin)
  chats!: Chat[];
}