import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { User } from '../../user/entities/user.entity';
import { Pet } from '../../pet/entities/pet.entity';
import { Restaurant } from '../../restaurant/entities/restaurant.entity';
import { Question } from '../../question/entities/question.entity';
import { Movie } from '../../movie/entities/movie.entity';  // Make sure this path is correct
import { DateIdea } from 'src/date-idea/entities/date-idea.entity';
import { Activity } from 'src/activity/entities/activity.entity';

@Entity()
@ObjectType()
export class Partnership {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @ManyToOne(() => User, (user) => user.partnership, { nullable: false })
  @Field(() => User)
  user1: User;

  @ManyToOne(() => User, (user) => user.partnership, { nullable: false })
  @Field(() => User)
  user2: User;

  @Column()
  @Field()
  startDate: string;

  @Column({ default: 'active' }) // Default status value
  @Field()
  status: string;

  @Column({ type: 'int', nullable: true })
  @Field(() => Int, { nullable: true })
  sharedPoints?: number;

  @OneToMany(() => Pet, (pet) => pet.partnership)
  @Field(() => [Pet], { nullable: true })
  pets?: Pet[];

  @OneToMany(() => User, (user) => user.partnership)
  @Field(() => [User], { nullable: true })
  users?: User[];

  @OneToMany(() => Question, (question) => question.partnership)
  @Field(() => [Question], { nullable: true })
  questions?: Question[];

  @OneToMany(() => Restaurant, (restaurant) => restaurant.partnership)
  @Field(() => [Restaurant], { nullable: true })
  restaurants?: Restaurant[];

  @OneToMany(() => Movie, (movie) => movie.partnership)
  @Field(() => [Movie], { nullable: true })
  movies?: Movie[];

  @OneToMany(() => DateIdea, (dateIdea) => dateIdea.partnership)
  @Field(() => [DateIdea], { nullable: true })
  dateIdeas?: DateIdea[];

  @OneToMany(() => Activity, (activity) => activity.partnership)
  @Field(() => [Activity], { nullable: true })
  activities?: Activity[];

}
