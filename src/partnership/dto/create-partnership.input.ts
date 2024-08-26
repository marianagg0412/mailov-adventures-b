import { InputType, Field, Int } from '@nestjs/graphql';
import { IsInt, IsString, IsOptional } from 'class-validator';

@InputType()
export class CreatePartnershipInput {
  @Field(() => Int)
  @IsInt()
  user1Id: number;

  @Field(() => Int)
  @IsInt()
  user2Id: number;

  @Field()
  @IsString()
  startDate: string;

  @Field({ nullable: false })
  @IsString()
  status: string;
}
