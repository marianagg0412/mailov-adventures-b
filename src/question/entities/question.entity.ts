import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinTable, ManyToMany, CreateDateColumn } from 'typeorm';
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

  @CreateDateColumn({ type: 'timestamp' }) // Automatically set the current date and time
  @Field(() => String) // or use Date type if you prefer
  dateAsked: Date;

  @ManyToMany(() => Partnership, (partnership) => partnership.questions)
  @Field(() => [Partnership])
  partnerships: Partnership[];  // Related to partnership
}
