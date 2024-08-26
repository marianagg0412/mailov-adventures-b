import { InputType, Field, Int, ID } from '@nestjs/graphql';
import { IsString, IsInt, IsOptional } from 'class-validator';

@InputType()
export class UpdateActivityInput {
  @Field(() => ID)
  id: number;

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

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  partnershipId?: number;
}
