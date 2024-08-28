import { InputType, Field, ID, Int } from '@nestjs/graphql';
import { IsString, IsOptional, IsBoolean, IsInt, IsArray } from 'class-validator';

@InputType()
export class UpdateRestaurantInput {
  // @Field(() => Int)
  // id: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  location?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  cuisineType?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  dateAdded?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  extra?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  visited?: boolean;

  @Field(() => [Int], { nullable: true })
  @IsOptional()
  @IsArray()
  partnershipIds?: number[];
}
