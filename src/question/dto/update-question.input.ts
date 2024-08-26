import { InputType, Field, ID, Int } from '@nestjs/graphql';
import { IsString, IsOptional, IsInt } from 'class-validator';

@InputType()
export class UpdateQuestionInput {
  @Field(() => ID)
  id: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  questionText?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  category?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  answer?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  dateAsked?: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  partnershipId?: number;
}
