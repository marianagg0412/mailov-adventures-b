import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinTable, ManyToMany, CreateDateColumn } from 'typeorm';
import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { Partnership } from '../../partnership/entities/partnership.entity';

@Entity()
@ObjectType()
export class Restaurant {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @ManyToMany(() => Partnership, (partnership) => partnership.restaurants)
  @Field(() => [Partnership], { nullable: 'items' })
  partnerships?: Partnership[];

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  location: string;

  @Column()
  @Field()
  cuisineType: string;

  @CreateDateColumn({ type: 'timestamp' })
  @Field()
  dateAdded: string;

  @Column({ default: '', nullable: true }) // Allow null values
  @Field({ nullable: true })
  extra?: string;

  @Column({ default: false })
  @Field()
  visited: boolean;
}
