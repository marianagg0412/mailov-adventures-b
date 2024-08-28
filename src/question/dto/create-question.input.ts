import { InputType, Field, Int } from '@nestjs/graphql';
import { IsString, IsOptional, IsInt, IsArray } from 'class-validator';

@InputType()
export class CreateQuestionInput {
  @Field()
  @IsString()
  questionText: string;

  @Field()
  @IsString()
  category: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  answer?: string;

  @Field(() => Int)
  @IsInt()
  userId: number;

  @Field(() => [Int], { nullable: true })
  @IsArray()
  @IsOptional()
  partnershipIds?: number[];
}
