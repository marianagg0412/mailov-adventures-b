import { InputType, Field, Int } from '@nestjs/graphql';
import { IsString, IsOptional, IsInt } from 'class-validator';

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

  @Field()
  @IsString()
  dateAsked: string;

  @Field(() => Int)
  @IsInt()
  userId: number;

  @Field(() => Int)
  @IsInt()
  partnershipId: number;  // Linked to Partnership
}
