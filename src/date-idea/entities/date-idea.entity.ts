import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinTable, ManyToMany } from 'typeorm';
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

  @ManyToMany(() => Partnership, (partnership) => partnership.dateIdeas)
  @JoinTable()  // Defines the owning side of the relationship
  @Field(() => [Partnership])
  partnerships: Partnership[];  // Executed by partnership
}
