import { InputType, Field, Int } from '@nestjs/graphql';
import { IsString, IsEmail, IsInt } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @IsString()
  name: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  password: string;

  @Field(() => Int, { defaultValue: 0 }) // Points should have a default value
  @IsInt()
  points?: number;
}
