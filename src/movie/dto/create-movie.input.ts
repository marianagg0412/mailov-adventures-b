import { InputType, Field, Int } from '@nestjs/graphql';
import { IsString, IsInt, IsArray, IsOptional } from 'class-validator';

@InputType()
export class CreateMovieInput {
  @Field()
  @IsString()
  title: string;

  @Field()
  @IsString()
  genre: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  priority?: string; // Default: "low"

  @Field(() => [Int], { nullable: true })
  @IsArray()
  @IsOptional()
  partnershipIds?: number[];
}
