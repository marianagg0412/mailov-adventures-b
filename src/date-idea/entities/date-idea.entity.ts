import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinTable, ManyToMany, CreateDateColumn } from 'typeorm';
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

  @CreateDateColumn({ type: 'timestamp' })
  @Field()
  dateAdded: string;

  @Column('int')
  @Field(() => Int)
  enthusiasm: number;

  @Column({ default: false })
  @Field()
  done: boolean;

  @ManyToMany(() => Partnership, (partnership) => partnership.dateIdeas)
  @Field(() => [Partnership])
  partnershipIds: Partnership[];  // Executed by partnership
}
