import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './entities/question.entity';
import { CreateQuestionInput } from './dto/create-question.input';
import { UpdateQuestionInput } from './dto/update-question.input';
import { Partnership } from '../partnership/entities/partnership.entity';
import { User } from '../user/entities/user.entity';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
    @InjectRepository(Partnership)
    private partnershipRepository: Repository<Partnership>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createQuestionInput: CreateQuestionInput): Promise<Question> {
    const { partnershipId, userId, ...rest } = createQuestionInput;

    const partnership = await this.partnershipRepository.findOne({ where: { id: partnershipId } });
    if (!partnership) {
      throw new NotFoundException(`Partnership with ID ${partnershipId} not found.`);
    }

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found.`);
    }

    const question = this.questionRepository.create({
      ...rest,
      user,
      partnerships: [partnership], // Ensure partnership is included
    });

    return this.questionRepository.save(question);
  }

  async findAll(): Promise<Question[]> {
    return this.questionRepository.find({ relations: ['user', 'partnerships'] });
  }

  async findOne(id: number): Promise<Question> {
    const question = await this.questionRepository.findOne({
      where: { id },
      relations: ['user', 'partnerships'],
    });

    if (!question) {
      throw new NotFoundException(`Question with ID ${id} not found.`);
    }

    return question;
  }

  async update(id: number, updateQuestionInput: UpdateQuestionInput): Promise<Question> {
    const question = await this.questionRepository.preload({
      id,
      ...updateQuestionInput,
    });

    if (!question) {
      throw new NotFoundException(`Question with ID ${id} not found.`);
    }

    return this.questionRepository.save(question);
  }

  async remove(id: number): Promise<void> {
    const question = await this.findOne(id);
    if (!question) {
      throw new NotFoundException(`Question with ID ${id} not found.`);
    }

    try {
      await this.questionRepository.remove(question);
    } catch (error) {
      throw new BadRequestException(`Failed to remove question with ID ${id}.`);
    }
  }
}
