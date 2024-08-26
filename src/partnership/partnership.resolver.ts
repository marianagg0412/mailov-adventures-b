import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
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

  @Query(() => [Partnership], { name: 'partnership' })
  findAll() {
    return this.partnershipService.findAll();
  }

  @Query(() => Partnership, { name: 'partnership' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.partnershipService.findOne(id);
  }

  @Mutation(() => Partnership)
  updatePartnership(@Args('updatePartnershipInput') updatePartnershipInput: UpdatePartnershipInput) {
    return this.partnershipService.update(updatePartnershipInput.id, updatePartnershipInput);
  }

  @Mutation(() => Partnership)
  removePartnership(@Args('id', { type: () => Int }) id: number) {
    return this.partnershipService.remove(id);
  }
}
