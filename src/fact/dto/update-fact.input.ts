import { InputType, Field, ID, Int } from '@nestjs/graphql';
import { IsString, IsOptional, IsInt } from 'class-validator';

@InputType()
export class UpdateFactInput {
  @Field(() => Int, { nullable: true }) // Make userId optional
  @IsOptional()
  @IsInt()
  userId?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  fact?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  dateAdded?: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  importance?: number;
}
