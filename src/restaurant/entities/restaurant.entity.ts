import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Partnership } from '../../partnership/entities/partnership.entity';

@Entity()
@ObjectType()
export class Restaurant {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @ManyToOne(() => Partnership, (partnership) => partnership.restaurants)
  @Field(() => Partnership)
  partnership: Partnership;  // Visited by partnership

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  location: string;

  @Column()
  @Field()
  cuisineType: string;

  @Column()
  @Field()
  dateAdded: string;

  @Column()
  @Field()
  extra: string; // Extra information

  @Column()
  @Field()
  visited: boolean;
}
