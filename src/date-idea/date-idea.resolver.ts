import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
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

  @Query(() => [DateIdea], { name: 'dateIdea' })
  findAll() {
    return this.dateIdeaService.findAll();
  }

  @Query(() => DateIdea, { name: 'dateIdea' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.dateIdeaService.findOne(id);
  }

  @Mutation(() => DateIdea)
  updateDateIdea(@Args('updateDateIdeaInput') updateDateIdeaInput: UpdateDateIdeaInput) {
    return this.dateIdeaService.update(updateDateIdeaInput.id, updateDateIdeaInput);
  }

  @Mutation(() => DateIdea)
  removeDateIdea(@Args('id', { type: () => Int }) id: number) {
    return this.dateIdeaService.remove(id);
  }
}
