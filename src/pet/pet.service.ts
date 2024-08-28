import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pet } from './entities/pet.entity';
import { CreatePetInput } from './dto/create-pet.input';
import { UpdatePetInput } from './dto/update-pet.input';
import { Partnership } from '../partnership/entities/partnership.entity';

@Injectable()
export class PetService {
  constructor(
    @InjectRepository(Pet)
    private petRepository: Repository<Pet>,
    @InjectRepository(Partnership)
    private partnershipRepository: Repository<Partnership>,
  ) {}

  async create(createPetInput: CreatePetInput): Promise<Pet> {
    const { partnershipId, ...rest } = createPetInput;

    const partnership = await this.partnershipRepository.findOne({ where: { id: partnershipId } });
    if (!partnership) {
      throw new NotFoundException(`Partnership with ID ${partnershipId} not found.`);
    }

    const pet = this.petRepository.create({
      ...rest,
      partnership,
    });

    return this.petRepository.save(pet);
  }

  async findAll(): Promise<Pet[]> {
    return this.petRepository.find({ relations: ['partnership'] });
  }

  async findOne(id: number): Promise<Pet> {
    const pet = await this.petRepository.findOne({
      where: { id },
      relations: ['partnership'],
    });

    if (!pet) {
      throw new NotFoundException(`Pet with ID ${id} not found.`);
    }

    return pet;
  }

  async update(id: number, updatePetInput: UpdatePetInput): Promise<Pet> {
    const pet = await this.petRepository.preload({
      id,
      ...updatePetInput,
    });

    if (!pet) {
      throw new NotFoundException(`Pet with ID ${id} not found.`);
    }

    return this.petRepository.save(pet);
  }

  async remove(id: number): Promise<void> {
    const pet = await this.findOne(id);
    if (!pet) {
      throw new NotFoundException(`Pet with ID ${id} not found.`);
    }

    try {
      await this.petRepository.remove(pet);
    } catch (error) {
      throw new BadRequestException(`Failed to remove pet with ID ${id}.`);
    }
  }
}
