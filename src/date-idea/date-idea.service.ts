import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
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
    const { userId, partnershipIds = [], ...rest } = createDateIdeaInput;
  
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found.`);
    }
  
    const partnerships = partnershipIds.length > 0
      ? await this.partnershipRepository.findBy({ id: In(partnershipIds) })
      : [];
  
    // Check if any provided partnership IDs are invalid
    const invalidPartnershipIds = partnershipIds.filter(id => !partnerships.find(p => p.id === id));
    if (invalidPartnershipIds.length > 0) {
      throw new NotFoundException(`Partnership(s) with ID(s) ${invalidPartnershipIds.join(', ')} not found.`);
    }
  
    const dateIdea = this.dateIdeaRepository.create({
      ...rest,
      user,
      partnerships,
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
    const dateIdea = await this.dateIdeaRepository.findOne({
      where: { id },
      relations: ['user', 'partnerships'], // Ensure related entities are loaded
    });

    if (!dateIdea) {
      throw new NotFoundException(`DateIdea with ID ${id} not found.`);
    }

    const { userId, partnershipIds, ...updateData } = updateDateIdeaInput;

    if (userId !== undefined) {
      const user = await this.userRepository.findOne({ where: { id: userId } });
      if (!user) {
        throw new NotFoundException(`User with ID ${userId} not found.`);
      }
      dateIdea.user = user;
    }

    if (partnershipIds !== undefined) {
      const partnerships = await this.partnershipRepository.findBy({ id: In(partnershipIds) });

      // Check if any provided partnership IDs are invalid
      const invalidPartnershipIds = partnershipIds.filter(id => !partnerships.find(p => p.id === id));
      if (invalidPartnershipIds.length > 0) {
        throw new NotFoundException(`Partnership(s) with ID(s) ${invalidPartnershipIds.join(', ')} not found.`);
      }
      dateIdea.partnerships = partnerships;
    }

    // Merge the rest of the updates from updateDateIdeaInput into the found dateIdea
    this.dateIdeaRepository.merge(dateIdea, updateData);

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
