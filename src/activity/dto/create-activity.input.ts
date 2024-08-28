import { InputType, Field, Int } from '@nestjs/graphql';
import { IsString, IsInt, IsOptional, IsArray } from 'class-validator';

@InputType()
export class CreateActivityInput {
  @Field()
  @IsString()
  activityType: string;

  @Field(() => Int, { nullable: true , defaultValue: 0})
  @IsInt()
  @IsOptional()
  pointsEarned?: number;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  date?: string;

  @Field(() => Int)
  @IsInt()
  userId: number;  // Proposed by user

  @Field(() => [Int], { nullable: true })
  @IsArray()
  @IsOptional()
  partnershipIds?: number[];
}
