import { InputType, Field, Int } from '@nestjs/graphql';
import { IsString, IsInt, IsOptional, IsBoolean } from 'class-validator';

@InputType()
export class CreateDateIdeaInput {
  @Field()
  @IsString()
  idea: string;

  @Field()
  @IsString()
  category: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  review?: string;

  @Field()
  @IsString()
  dateAdded: string;

  @Field(() => Int)
  @IsInt()
  enthusiasm: number;

  @Field()
  @IsBoolean()
  done: boolean;

  @Field(() => Int)
  @IsInt()
  userId: number;  // Proposed by user

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  partnershipId?: number;  // Executed by partnership (optional)
}
