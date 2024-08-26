import { InputType, Field, Int } from '@nestjs/graphql';
import { IsString, IsInt } from 'class-validator';

@InputType()
export class CreateActivityInput {
  @Field()
  @IsString()
  activityType: string;

  @Field(() => Int)
  @IsInt()
  pointsEarned: number;

  @Field()
  @IsString()
  date: string;

  @Field(() => Int)
  @IsInt()
  userId: number;  // Proposed by user

  @Field(() => Int)
  @IsInt()
  partnershipId: number;  // Executed by partnership
}
