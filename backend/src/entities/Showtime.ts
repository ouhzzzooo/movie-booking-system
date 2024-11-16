import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Movie } from './Movie';
import { Cinema } from './Cinema';
import { Booking } from './Booking';

@Entity()
export class Showtime {
  @PrimaryGeneratedColumn()
  showtimeId!: number;

  @Column()
  dateTime!: Date;

  @ManyToOne(() => Movie, (movie) => movie.showtimes)
  @JoinColumn({ name: 'movieId' })
  movie!: Movie;

  @ManyToOne(() => Cinema, (cinema) => cinema.showtimes)
  @JoinColumn({ name: 'cinemaId' })
  cinema!: Cinema;

  @OneToMany(() => Booking, (booking) => booking.showtime)
  bookings!: Booking[];
}