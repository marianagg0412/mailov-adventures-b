import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
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

  @ManyToOne(() => Partnership, (partnership) => partnership.movies, { nullable: false })
  @Field(() => Partnership)
  partnership: Partnership; // Linked to Partnership
}
