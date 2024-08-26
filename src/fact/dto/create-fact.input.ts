import { InputType, Field, Int } from '@nestjs/graphql';
import { IsString, IsInt } from 'class-validator';

@InputType()
export class CreateFactInput {
  @Field(() => Int)
  @IsInt()
  userId: number;  // Linked to User

  @Field()
  @IsString()
  fact: string;

  @Field()
  @IsString()
  dateAdded: string;

  @Field(() => Int)
  @IsInt()
  importance: number;
}
