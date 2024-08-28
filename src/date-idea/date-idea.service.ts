import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DateIdea } from './entities/date-idea.entity';
import { CreateDateIdeaInput } from './dto/create-date-idea.input';
import { UpdateDateIdeaInput } from './dto/update-date-idea.input';
import { User } from '../user/entities/user.entity';
import { Partnership } from '../partnership/entities/partnership.entity';

@Injectable()
export class DateIdeaService {
  constructor(
    @InjectRepository(DateIdea)
    private dateIdeaRepository: Repository<DateIdea>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Partnership)
    private partnershipRepository: Repository<Partnership>,
  ) {}

  async create(createDateIdeaInput: CreateDateIdeaInput): Promise<DateIdea> {
    const { userId, partnershipId, ...rest } = createDateIdeaInput;

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found.`);
    }

    const partnership = partnershipId
      ? await this.partnershipRepository.findOne({ where: { id: partnershipId } })
      : null;

    if (partnershipId && !partnership) {
      throw new NotFoundException(`Partnership with ID ${partnershipId} not found.`);
    }

    const dateIdea = this.dateIdeaRepository.create({
      ...rest,
      user,
      partnerships: partnership ? [partnership] : [],
    });

    return this.dateIdeaRepository.save(dateIdea);
  }

  async findAll(): Promise<DateIdea[]> {
    return this.dateIdeaRepository.find({ relations: ['user', 'partnerships'] });
  }

  async findOne(id: number): Promise<DateIdea> {
    const dateIdea = await this.dateIdeaRepository.findOne({
      where: { id },
      relations: ['user', 'partnerships'],
    });

    if (!dateIdea) {
      throw new NotFoundException(`DateIdea with ID ${id} not found.`);
    }

    return dateIdea;
  }

  async update(id: number, updateDateIdeaInput: UpdateDateIdeaInput): Promise<DateIdea> {
    const dateIdea = await this.dateIdeaRepository.preload({
      id,
      ...updateDateIdeaInput,
    });

    if (!dateIdea) {
      throw new NotFoundException(`DateIdea with ID ${id} not found.`);
    }

    return this.dateIdeaRepository.save(dateIdea);
  }

  async remove(id: number): Promise<void> {
    const dateIdea = await this.findOne(id);
    if (!dateIdea) {
      throw new NotFoundException(`DateIdea with ID ${id} not found.`);
    }

    try {
      await this.dateIdeaRepository.remove(dateIdea);
    } catch (error) {
      throw new BadRequestException(`Failed to remove DateIdea with ID ${id}.`);
    }
  }
}
