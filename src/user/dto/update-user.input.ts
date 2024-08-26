import { InputType, Field, Int, ID } from '@nestjs/graphql';
import { IsString, IsEmail, IsOptional, IsInt } from 'class-validator';

@InputType()
export class UpdateUserInput {
  @Field(() => ID)
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
