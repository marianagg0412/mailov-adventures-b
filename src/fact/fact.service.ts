import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Fact } from './entities/fact.entity';
import { CreateFactInput } from './dto/create-fact.input';
import { UpdateFactInput } from './dto/update-fact.input';
import { User } from '../user/entities/user.entity';

@Injectable()
export class FactService {
  constructor(
    @InjectRepository(Fact)
    private factRepository: Repository<Fact>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createFactInput: CreateFactInput): Promise<Fact> {
    const { userId, ...rest } = createFactInput;

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found.`);
    }

    const fact = this.factRepository.create({
      ...rest,
      user,
    });

    return this.factRepository.save(fact);
  }

  async findAll(): Promise<Fact[]> {
    return this.factRepository.find({ relations: ['user'] });
  }

  async findOne(id: number): Promise<Fact> {
    const fact = await this.factRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!fact) {
      throw new NotFoundException(`Fact with ID ${id} not found.`);
    }

    return fact;
  }

  async update(id: number, updateFactInput: UpdateFactInput): Promise<Fact> {
    const fact = await this.factRepository.preload({
      id,
      ...updateFactInput,
    });

    if (!fact) {
      throw new NotFoundException(`Fact with ID ${id} not found.`);
    }

    return this.factRepository.save(fact);
  }

  async remove(id: number): Promise<void> {
    const fact = await this.findOne(id);
    if (!fact) {
      throw new NotFoundException(`Fact with ID ${id} not found.`);
    }

    try {
      await this.factRepository.remove(fact);
    } catch (error) {
      throw new BadRequestException(`Failed to remove fact with ID ${id}.`);
    }
  }
}
