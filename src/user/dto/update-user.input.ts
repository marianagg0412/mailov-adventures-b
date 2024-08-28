import { InputType, Field, Int, ID } from '@nestjs/graphql';
import { IsString, IsEmail, IsOptional, IsInt } from 'class-validator';

@InputType()
export class UpdateUserInput {
  @Field(() => ID) // Changed from ID to Int to match the type of the id field
  @IsInt()
  id: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsEmail()
  email?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  password?: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  points?: number;
}

// @InputType()
// export class UpdateUserInput extends PartialType(CreateUserInput) {}