import { InputType, Field, ID, Int } from '@nestjs/graphql';
import { IsString, IsOptional, IsInt } from 'class-validator';

@InputType()
export class UpdateFactInput {
  @Field(() => ID)
  id: number;

  @Field(() => Int)
  @IsInt()
  userId: number;  // Still required for linking to User

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
