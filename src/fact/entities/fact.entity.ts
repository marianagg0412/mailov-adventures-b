import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { User } from '../../user/entities/user.entity';

@Entity()
@ObjectType()
export class Fact {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @ManyToOne(() => User, (user) => user.facts)
  @Field(() => User)
  user: User;

  @Column()
  @Field()
  fact: string;

  @CreateDateColumn({ type: 'timestamp' })
  @Field()
  dateAdded: string;

  @Column({default: 1})
  @Field(() => Int)
  importance: number;
}
