import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FactService } from './fact.service';
import { Fact } from './entities/fact.entity';
import { CreateFactInput } from './dto/create-fact.input';
import { UpdateFactInput } from './dto/update-fact.input';

@Resolver(() => Fact)
export class FactResolver {
  constructor(private readonly factService: FactService) {}

  @Mutation(() => Fact)
  createFact(@Args('createFactInput') createFactInput: CreateFactInput) {
    return this.factService.create(createFactInput);
  }

  @Query(() => [Fact], { name: 'fact' })
  findAll() {
    return this.factService.findAll();
  }

  @Query(() => Fact, { name: 'fact' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.factService.findOne(id);
  }

  @Mutation(() => Fact)
  updateFact(@Args('updateFactInput') updateFactInput: UpdateFactInput) {
    return this.factService.update(updateFactInput.id, updateFactInput);
  }

  @Mutation(() => Fact)
  removeFact(@Args('id', { type: () => Int }) id: number) {
    return this.factService.remove(id);
  }
}
