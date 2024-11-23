import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinTable, ManyToMany, CreateDateColumn } from 'typeorm';
import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { User } from '../../user/entities/user.entity';
import { Pet } from '../../pet/entities/pet.entity';
import { Restaurant } from '../../restaurant/entities/restaurant.entity';
import { Question } from '../../question/entities/question.entity';
import { Movie } from '../../movie/entities/movie.entity'; 
import { DateIdea } from 'src/date-idea/entities/date-idea.entity';
import { Activity } from 'src/activity/entities/activity.entity';

@Entity()
@ObjectType()
export class Partnership {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @ManyToOne(() => User, (user) => user.partnershipsAsUser1, { nullable: false })
  @Field(() => User)
  user1: User;

  @ManyToOne(() => User, (user) => user.partnershipsAsUser2, { nullable: false })
  @Field(() => User)
  user2: User;

  @CreateDateColumn({ type: 'timestamp' }) // Automatically set the current date and time
  @Field(() => String) // or use Date type if you prefer
  startDate: Date;

  @Column({ default: 'active' }) 
  @Field()
  status: string;

  @Column({ type: 'int', nullable: true })
  @Field(() => Int, { nullable: true })
  sharedPoints?: number;

  @OneToMany(() => Pet, (pet) => pet.partnership)
  @Field(() => [Pet], { nullable: true })
  pets?: Pet[];

  @ManyToMany(() => Question, (question) => question.partnerships)
  @JoinTable()
  @Field(() => [Question], { nullable: true })
  questions?: Question[];

  @ManyToMany(() => Restaurant, (restaurant) => restaurant.partnerships)
  @JoinTable()  // Defines the owning side of the relationship
  @Field(() => [Restaurant], { nullable: true })
  restaurants?: Restaurant[];

  @ManyToMany(() => Movie, (movie) => movie.partnerships)
  @JoinTable()
  @Field(() => [Movie], { nullable: true })
  movies?: Movie[];

  @ManyToMany(() => DateIdea, (dateIdea) => dateIdea.partnershipIds)
  @JoinTable()
  @Field(() => [DateIdea], { nullable: true })
  dateIdeas?: DateIdea[];

  @ManyToMany(() => Activity, (activity) => activity.partnershipIds)
  @JoinTable()
  @Field(() => [Activity], { nullable: true })
  activities?: Activity[];
}
