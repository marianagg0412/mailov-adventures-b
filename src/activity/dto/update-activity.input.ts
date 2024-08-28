import { InputType, Field, Int, ID } from '@nestjs/graphql';
import { IsString, IsInt, IsOptional, IsArray } from 'class-validator';

@InputType()
export class UpdateActivityInput {

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  activityType?: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  pointsEarned?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  date?: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  userId?: number;

  @Field(() => [Int], { nullable: true })
  @IsArray()
  @IsOptional()
  partnershipIds?: number[];
}
