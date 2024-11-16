import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Cinema } from './Cinema';
import { Booking } from './Booking';

@Entity()
export class Seat {
  @PrimaryGeneratedColumn()
  seatId!: number;

  @Column()
  seatNumber!: string;

  @Column()
  rowNumber!: string;

  @ManyToOne(() => Cinema, (cinema) => cinema.seats)
  @JoinColumn({ name: 'cinemaId' })
  cinema!: Cinema;

  @OneToMany(() => Booking, (booking) => booking.seat)
  bookings!: Booking[];
}