import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from '../../user/entities/user.entity';
import { Partnership } from '../../partnership/entities/partnership.entity';

@Entity()
@ObjectType()
export class Question {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @ManyToOne(() => User, (user) => user.questions)
  @Field(() => User)
  user: User;  // Proposed by user

  @Column()
  @Field()
  questionText: string;

  @Column()
  @Field()
  category: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  answer?: string;

  @Column()
  @Field()
  dateAsked: string;

  @ManyToOne(() => Partnership, (partnership) => partnership.questions, { nullable: false })
  @Field(() => Partnership)
  partnership: Partnership;  // Related to partnership
}
