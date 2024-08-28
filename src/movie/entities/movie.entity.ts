import { Entity, Column, PrimaryGeneratedColumn, JoinTable, ManyToMany } from 'typeorm';
import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { Partnership } from '../../partnership/entities/partnership.entity';

@Entity()
@ObjectType()
export class Movie {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column()
  @Field()
  title: string;

  @Column()
  @Field()
  genre: string;

  @Column({ default: 'low' }) // Default priority value
  @Field()
  priority: string;

  @ManyToMany(() => Partnership, (partnership) => partnership.movies)
  @JoinTable()  // Defines the owning side of the relationship
  @Field(() => [Partnership])
  partnerships: Partnership[];
}
