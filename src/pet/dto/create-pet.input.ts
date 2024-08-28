import { InputType, Field, Int } from '@nestjs/graphql';
import { IsString, IsInt, IsDate } from 'class-validator';

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
  @IsDate()
  lastFed: Date;

  @Field()
  @IsInt()
  partnershipId: number;  // Linking to Partnership
}
