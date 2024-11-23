import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { DateIdeaService } from './date-idea.service';
import { DateIdea } from './entities/date-idea.entity';
import { CreateDateIdeaInput } from './dto/create-date-idea.input';
import { UpdateDateIdeaInput } from './dto/update-date-idea.input';

@Resolver(() => DateIdea)
export class DateIdeaResolver {
  constructor(private readonly dateIdeaService: DateIdeaService) {}

  @Mutation(() => DateIdea)
  createDateIdea(@Args('createDateIdeaInput') createDateIdeaInput: CreateDateIdeaInput) {
    return this.dateIdeaService.create(createDateIdeaInput);
  }

  @Query(() => [DateIdea], { name: 'dateIdeas' })
  findAll() {
    return this.dateIdeaService.findAll();
  }

  @Query(() => DateIdea, { name: 'dateIdea' })
  findOne(@Args('id', { type: () => ID }) id: number) {
    return this.dateIdeaService.findOne(id);
  }

  @Query(() => [DateIdea], { name: 'dateIdeasForPartnership' })
  findDateIdeasForPartnership(@Args('partnershipId', { type: () => Int }) partnershipId: number) {
    return this.dateIdeaService.findByPartnership(partnershipId);
  }

  @Mutation(() => DateIdea)
  updateDateIdea(
    @Args('id', { type: () => ID }) id: number,
    @Args('updateDateIdeaInput') updateDateIdeaInput: UpdateDateIdeaInput) {
    return this.dateIdeaService.update(id, updateDateIdeaInput);
  }

  @Mutation(() => Boolean)
  async removeDateIdea(@Args('id', { type: () => ID }) id: number) {
    this.dateIdeaService.remove(id);
    return true;
  }
}
