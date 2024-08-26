import { InputType, Field, Int, ID } from '@nestjs/graphql';
import { IsString, IsInt, IsOptional } from 'class-validator';

@InputType()
export class UpdatePetInput {
  @Field(() => ID)
  id: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  type?: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  hungerLevel?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  happinessLevel?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  lastFed?: string;

  @Field(() => Int)
  @IsInt()
  @IsOptional()
  partnershipId?: number;
}
