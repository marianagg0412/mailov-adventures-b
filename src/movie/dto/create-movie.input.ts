import { InputType, Field, Int } from '@nestjs/graphql';
import { IsString, IsInt } from 'class-validator';

@InputType()
export class CreateMovieInput {
  @Field()
  @IsString()
  title: string;

  @Field()
  @IsString()
  genre: string;

  @Field()
  @IsString()
  priority: string; // Default: "low"

  @Field(() => Int)
  @IsInt()
  partnershipId: number;  // Linked to Partnership
}
