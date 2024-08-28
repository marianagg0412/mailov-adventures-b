import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinTable, ManyToMany } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Partnership } from '../../partnership/entities/partnership.entity';

@Entity()
@ObjectType()
export class Restaurant {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @ManyToMany(() => Partnership, (partnership) => partnership.restaurants)
  @JoinTable()  // Defines the owning side of the relationship
  @Field(() => [Partnership])
  partnerships: Partnership[];

  
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
