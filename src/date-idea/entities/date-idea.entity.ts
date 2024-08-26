import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { User } from '../../user/entities/user.entity';
import { Partnership } from '../../partnership/entities/partnership.entity';

@Entity()
@ObjectType()
export class DateIdea {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @ManyToOne(() => User, (user) => user.dateIdeas)
  @Field(() => User)
  user: User;  // Proposed by user

  @Column()
  @Field()
  idea: string;

  @Column()
  @Field()
  category: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  review?: string;

  @Column()
  @Field()
  dateAdded: string;

  @Column('int')
  @Field(() => Int)
  enthusiasm: number;

  @Column()
  @Field()
  done: boolean;

  @ManyToOne(() => Partnership, (partnership) => partnership.dateIdeas, { nullable: true })
  @Field(() => Partnership, { nullable: true })
  partnership?: Partnership;  // Executed by partnership
}
