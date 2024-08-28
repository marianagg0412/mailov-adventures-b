import { InputType, Field, Int } from '@nestjs/graphql';
import { IsString, IsInt, IsOptional, IsBoolean, IsArray } from 'class-validator';

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

  @Field(() => Int)
  @IsInt()
  enthusiasm: number;

  @Field({ nullable: true, defaultValue: false })
  @IsBoolean()
  @IsOptional()
  done?: boolean;

  @Field(() => Int)
  @IsInt()
  userId: number;  // Proposed by user

  @Field(() => [Int], { nullable: true })
  @IsArray()
  @IsOptional()
  partnershipIds?: number[];
}
