import { InputType, Field, ID, Int } from '@nestjs/graphql';
import { IsString, IsOptional, IsInt } from 'class-validator';

@InputType()
export class UpdateMovieInput {
  @Field(() => ID)
  id: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  title?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  genre?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  priority?: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  partnershipId?: number;
}
