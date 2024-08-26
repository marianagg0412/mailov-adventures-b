import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Partnership } from '../../partnership/entities/partnership.entity';

@Entity()
@ObjectType()
export class Pet {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  type: string;

  @Column({ type: 'int', default: 0 })
  @Field(() => Int)
  hungerLevel: number;

  @Column({ type: 'int', default: 0 })
  @Field(() => Int)
  happinessLevel: number;

  @Column()
  @Field()
  lastFed: string;

  @ManyToOne(() => Partnership, (partnership) => partnership.pets)
  @Field(() => Partnership)
  partnership: Partnership;
}
