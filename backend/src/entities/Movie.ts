import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Showtime } from './Showtime';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  movieId!: number;

  @Column()
  name!: string;

  @Column()
  genre!: string;

  @Column()
  rating!: string;

  @Column()
  duration!: number;

  @Column('text')
  details!: string;

  @Column()
  image!: string;

  @OneToMany(() => Showtime, (showtime) => showtime.movie)
  showtimes!: Showtime[];
}