import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './User';
import { Showtime } from './Showtime';
import { Seat } from './Seat';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  bookingId!: number;

  @Column()
  bookingDate!: Date;

  @Column()
  paymentStatus!: string;

  @Column()
  paymentMethod!: string;

  @Column({ nullable: true })
  email?: string;

  @Column({ nullable: true })
  mobile?: string;
  @ManyToOne(() => User, (user) => user.bookings, { nullable: true })
  @JoinColumn({ name: 'userId' })
  user?: User;

  @ManyToOne(() => Showtime, (showtime) => showtime.bookings)
  @JoinColumn({ name: 'showtimeId' })
  showtime!: Showtime;

  @ManyToOne(() => Seat, (seat) => seat.bookings)
  @JoinColumn({ name: 'seatId' })
  seat!: Seat;
}