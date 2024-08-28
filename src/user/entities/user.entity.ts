import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Partnership } from '../../partnership/entities/partnership.entity';
import { Fact } from '../../fact/entities/fact.entity';
import { DateIdea } from '../../date-idea/entities/date-idea.entity';
import { Question } from '../../question/entities/question.entity';
import { Activity } from 'src/activity/entities/activity.entity';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column()
  @Field()
  name: string;

  @Column({ unique: true })
  @Field()
  email: string;

  @Column()
  @Field()
  password: string;

  @Column({ type: 'int', default: 0 })
  @Field(() => Int)
  points: number;

  @OneToMany(() => Fact, (fact) => fact.user)
  @Field(() => [Fact])
  facts: Fact[];

  @OneToMany(() => DateIdea, (dateIdea) => dateIdea.user)
  @Field(() => [DateIdea])
  dateIdeas: DateIdea[];

  @OneToMany(() => Question, (question) => question.user)
  @Field(() => [Question])
  questions: Question[];

  @OneToMany(() => Activity, (activity) => activity.user)
  @Field(() => [Activity], { nullable: true })
  activities?: Activity[];

  @OneToMany(() => Partnership, (partnership) => partnership.user1)
  @Field(() => [Partnership], { nullable: true })
  partnershipsAsUser1?: Partnership[];

  @OneToMany(() => Partnership, (partnership) => partnership.user2)
  @Field(() => [Partnership], { nullable: true })
  partnershipsAsUser2?: Partnership[];
}
