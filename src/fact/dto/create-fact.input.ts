import { InputType, Field, Int } from '@nestjs/graphql';
import { IsString, IsInt, IsOptional } from 'class-validator';

@InputType()
export class CreateFactInput {
  @Field(() => Int)
  @IsInt()
  userId: number;  // Linked to User

  @Field()
  @IsString()
  fact: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsInt()
  importance?: number;
}
