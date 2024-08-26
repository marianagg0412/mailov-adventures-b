import { InputType, Field, Int, ID } from '@nestjs/graphql';
import { IsString, IsInt, IsOptional, IsBoolean } from 'class-validator';

@InputType()
export class UpdateDateIdeaInput {
  @Field(() => ID)
  id: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  idea?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  category?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  review?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  dateAdded?: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  enthusiasm?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  done?: boolean;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  userId?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  partnershipId?: number;
}
