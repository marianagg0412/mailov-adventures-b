import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { PetService } from './pet.service';
import { Pet } from './entities/pet.entity';
import { CreatePetInput } from './dto/create-pet.input';
import { UpdatePetInput } from './dto/update-pet.input';

@Resolver(() => Pet)
export class PetResolver {
  constructor(private readonly petService: PetService) {}

  @Mutation(() => Pet)
  createPet(@Args('createPetInput') createPetInput: CreatePetInput) {
    return this.petService.create(createPetInput);
  }

  @Query(() => [Pet], { name: 'pets' })
  findAll() {
    return this.petService.findAll();
  }

  @Query(() => Pet, { name: 'pet' })
  findOne(@Args('id', { type: () => ID }) id: number) {
    return this.petService.findOne(id);
  }

  @Mutation(() => Pet)
  async updatePet(
    @Args('id', { type: () => ID }) id: number,
    @Args('updatePetInput') updatePetInput: UpdatePetInput) {
    return this.petService.update(id, updatePetInput);
  }

  @Mutation(() => Boolean)
  async removePet(@Args('id', { type: () => ID }) id: number) {
    await this.petService.remove(id);
    return true;
  }
}
