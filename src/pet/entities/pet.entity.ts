import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
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

  @Column({ type: 'int', default: 100 })
  @Field(() => Int)
  happinessLevel: number;

  @CreateDateColumn({ type: 'timestamp' })
  @Field()
  lastFed: Date;

  @ManyToOne(() => Partnership, (partnership) => partnership.pets)
  @Field(() => Partnership)
  partnership: Partnership;
}
