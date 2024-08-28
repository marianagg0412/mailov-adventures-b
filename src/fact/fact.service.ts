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
      importance: createFactInput.importance || 1,
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
    // Find the existing fact by its ID
    const fact = await this.factRepository.findOne({
      where: { id },
      relations: ['user'], // Ensure 'user' relation is loaded
    });
  
    if (!fact) {
      throw new NotFoundException(`Fact with ID ${id} not found.`);
    }
  
    // If updateFactInput contains userId, update the user relation
    if (updateFactInput.userId !== undefined) {
      const user = await this.userRepository.findOneBy({ id: updateFactInput.userId });
      if (!user) {
        throw new NotFoundException(`User with ID ${updateFactInput.userId} not found.`);
      }
      fact.user = user;
    }
  
    // Merge the rest of the updates from updateFactInput into the found fact
    this.factRepository.merge(fact, updateFactInput);
  
    // Save the updated fact
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
