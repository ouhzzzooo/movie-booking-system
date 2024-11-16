import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Showtime } from './Showtime';
import { Seat } from './Seat';

@Entity()
export class Cinema {
  @PrimaryGeneratedColumn()
  cinemaId!: number;

  @Column()
  name!: string;

  @Column()
  location!: string;

  @OneToMany(() => Showtime, (showtime) => showtime.cinema)
  showtimes!: Showtime[];

  @OneToMany(() => Seat, (seat) => seat.cinema)
  seats!: Seat[];
}