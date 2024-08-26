import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
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

  @Column()
  @Field()
  dateAdded: string;

  @Column('int')
  @Field(() => Int)
  importance: number;
}
