import { InputType, Field, Int, ID } from '@nestjs/graphql';
import { IsString, IsInt, IsOptional, IsDate } from 'class-validator';

@InputType()
export class UpdatePetInput {

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
  @IsDate()
  lastFed?: Date;

  @Field(() => Int, { nullable: true })
  @IsInt()
  @IsOptional()
  partnershipId?: number;
}
