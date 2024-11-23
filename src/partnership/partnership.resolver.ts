import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { PartnershipService } from './partnership.service';
import { Partnership } from './entities/partnership.entity';
import { CreatePartnershipInput } from './dto/create-partnership.input';
import { UpdatePartnershipInput } from './dto/update-partnership.input';

@Resolver(() => Partnership)
export class PartnershipResolver {
  constructor(private readonly partnershipService: PartnershipService) {}

  @Mutation(() => Partnership)
  createPartnership(@Args('createPartnershipInput') createPartnershipInput: CreatePartnershipInput) {
    return this.partnershipService.create(createPartnershipInput);
  }

  @Query(() => [Partnership], { name: 'getPartnerships' })
  findAll() {
    return this.partnershipService.findAll();
  }

  @Query(() => Partnership, { name: 'getOnePartnership' })
  findOne(@Args('id', { type: () => ID }) id: number) {
    return this.partnershipService.findOne(id);
  }

  @Mutation(() => Partnership)
  updatePartnership(
    @Args('id', { type: () => ID }) id: number,
    @Args('updatePartnershipInput') updatePartnershipInput: UpdatePartnershipInput
  ) {
    return this.partnershipService.update(id, updatePartnershipInput);
  }

  @Query(() => [Partnership], { name: 'getUserPartnershipDetails' })
  async getUserPartnershipDetails(@Args('userId', { type: () => Int }) userId: number): Promise<Partnership[]> {
    return this.partnershipService.getUserPartnershipDetails(userId);
  }
  
  

  @Mutation(() => Boolean)
  async removePartnership(@Args('id', { type: () => Int }) id: number) {
    try {
      await this.partnershipService.remove(id, 'inactive');
      return true;
    } catch (error) {
      return false; 
    }
  }
}
