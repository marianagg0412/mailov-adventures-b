import { InputType, Field, ID, Int } from '@nestjs/graphql';
import { IsString, IsOptional, IsInt, IsDate } from 'class-validator';

@InputType()
export class UpdatePartnershipInput {
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
  @IsDate()
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
