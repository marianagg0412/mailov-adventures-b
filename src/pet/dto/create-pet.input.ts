import { InputType, Field, Int } from '@nestjs/graphql';
import { IsString, IsInt } from 'class-validator';

@InputType()
export class CreatePetInput {
  @Field()
  @IsString()
  name: string;

  @Field()
  @IsString()
  type: string;

  @Field(() => Int)
  @IsInt()
  hungerLevel: number;

  @Field(() => Int)
  @IsInt()
  happinessLevel: number;

  @Field()
  @IsString()
  lastFed: string;

  @Field()
  @IsInt()
  partnershipId: number;  // Linking to Partnership
}
