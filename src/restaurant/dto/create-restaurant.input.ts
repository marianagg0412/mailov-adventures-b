import { InputType, Field, Int } from '@nestjs/graphql';
import { IsString, IsBoolean, IsInt } from 'class-validator';

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

  @Field()
  @IsString()
  dateAdded: string;

  @Field()
  @IsString()
  extra: string;

  @Field()
  @IsBoolean()
  visited: boolean;

  @Field(() => Int)
  @IsInt()
  partnershipId: number;  // Linked to Partnership
}
