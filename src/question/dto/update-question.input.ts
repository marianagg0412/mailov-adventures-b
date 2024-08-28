import { InputType, Field, ID, Int } from '@nestjs/graphql';
import { IsString, IsOptional, IsInt, IsArray } from 'class-validator';

@InputType()
export class UpdateQuestionInput {
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
  dateAsked?: Date;

  @Field(() => [Int], { nullable: true })
  @IsArray()
  @IsOptional()
  partnershipIds?: number[];
}
