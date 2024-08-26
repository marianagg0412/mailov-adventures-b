import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { User } from '../../user/entities/user.entity';
import { Partnership } from '../../partnership/entities/partnership.entity';

@Entity()
@ObjectType()
export class Activity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column()
  @Field()
  activityType: string;

  @Column('int')
  @Field(() => Int)
  pointsEarned: number;

  @Column()
  @Field()
  date: string;

  @ManyToOne(() => User, (user) => user.activities)
  @Field(() => User)
  user: User;

  @ManyToOne(() => Partnership, (partnership) => partnership.activities)
  @Field(() => Partnership)
  partnership: Partnership;  // Executed by partnership
}
