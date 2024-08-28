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

  @Field()
  @IsInt()
  partnershipId: number;  // Linking to Partnership
}
