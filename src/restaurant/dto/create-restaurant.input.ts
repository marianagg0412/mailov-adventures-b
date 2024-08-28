import { InputType, Field, Int } from '@nestjs/graphql';
import { IsString, IsInt, IsOptional, IsArray } from 'class-validator';

@InputType()
export class CreateRestaurantInput {
  @Field()
  @IsString()
  name: string;

  @Field()
  @IsString()
  location: string;

  @Field()
  @IsString()
  cuisineType: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  extra?: string;

  @Field(() => [Int], { nullable: true })
  @IsArray()
  @IsOptional()
  partnershipIds?: number[];
}
