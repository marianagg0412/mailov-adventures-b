import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { QuestionService } from './question.service';
import { Question } from './entities/question.entity';
import { CreateQuestionInput } from './dto/create-question.input';
import { UpdateQuestionInput } from './dto/update-question.input';

@Resolver(() => Question)
export class QuestionResolver {
  constructor(private readonly questionService: QuestionService) {}

  @Mutation(() => Question)
  async createQuestion(
    @Args('createQuestionInput') createQuestionInput: CreateQuestionInput
  ): Promise<Question> {
    return this.questionService.create(createQuestionInput);
  }

  @Query(() => [Question], { name: 'questions' })
  async findAll(): Promise<Question[]> {
    return this.questionService.findAll();
  }

  @Query(() => Question, { name: 'question' })
  async findOne(@Args('id', { type: () => ID }) id: number): Promise<Question> {
    return this.questionService.findOne(id);
  }

  @Mutation(() => Question)
  async updateQuestion(
    @Args('id', { type: () => ID }) id: number,
    @Args('updateQuestionInput') updateQuestionInput: UpdateQuestionInput
  ): Promise<Question> {
    return this.questionService.update(id, updateQuestionInput);
  }

  @Mutation(() => Boolean)
  async removeQuestion(@Args('id', { type: () => ID }) id: number): Promise<boolean> {
    await this.questionService.remove(id);
    return true;
  }
}
