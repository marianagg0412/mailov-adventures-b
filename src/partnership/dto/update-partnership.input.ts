import { InputType, Field, ID, Int } from '@nestjs/graphql';
import { IsString, IsOptional, IsInt } from 'class-validator';

@InputType()
export class UpdatePartnershipInput {
  @Field(() => ID)
  id: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  user1Id?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  user2Id?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  startDate?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  status?: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @IsInt()
  sharedPoints?: number;
}
