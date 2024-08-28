import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Partnership } from './entities/partnership.entity';
import { CreatePartnershipInput } from './dto/create-partnership.input';
import { UpdatePartnershipInput } from './dto/update-partnership.input';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class PartnershipService {
  constructor(
    @InjectRepository(Partnership)
    private partnershipRepository: Repository<Partnership>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createPartnershipInput: CreatePartnershipInput): Promise<Partnership> {
    await this.validateUserPartnerships(createPartnershipInput.user1Id, createPartnershipInput.user2Id);

    const user1 = await this.userRepository.findOne({ where: { id: createPartnershipInput.user1Id } });
    const user2 = await this.userRepository.findOne({ where: { id: createPartnershipInput.user2Id } });

    if (!user1 || !user2) {
      throw new BadRequestException('One or both users not found.');
    }

    const partnership = this.partnershipRepository.create({
      user1,
      user2
    });
    return this.partnershipRepository.save(partnership);
  }

  async update(id: number, updatePartnershipInput: UpdatePartnershipInput): Promise<Partnership> {
    const partnership = await this.partnershipRepository.findOne({ where: { id } });
    if (!partnership) {
      throw new BadRequestException('Partnership not found.');
    }
  
    if (updatePartnershipInput.user1Id || updatePartnershipInput.user2Id) {
      await this.validateUserPartnerships(updatePartnershipInput.user1Id, updatePartnershipInput.user2Id, id);
    }
  
    Object.assign(partnership, updatePartnershipInput);
  
    if (!partnership.user1 || !partnership.user2) {
      partnership.status = 'ended';
    }
  
    return this.partnershipRepository.save(partnership);
  }
  
  

  async findAll(): Promise<Partnership[]> {
    return this.partnershipRepository
      .createQueryBuilder('partnership') // We're using the QueryBuilder to join the user1 and user2 relations
      .leftJoinAndSelect('partnership.user1', 'user1') //because the default behavior of TypeORM is to return only the IDs of the related entities
      .leftJoinAndSelect('partnership.user2', 'user2')
      .getMany();
  }
  

  async findOne(id: number): Promise<Partnership> {
    const partnership = await this.partnershipRepository.findOne({
      where: { id },
      relations: ['user1', 'user2'], // Ensure that related entities are loaded
    });
    if (!partnership) {
      throw new BadRequestException('Partnership not found.');
    }
    return partnership;
  }

  async remove(id: number): Promise<void> {
    const result = await this.partnershipRepository.delete(id);
    if (result.affected === 0) {
      throw new BadRequestException('Partnership not found.');
    }
  }

  private async validateUserPartnerships(user1Id?: number, user2Id?: number, partnershipId?: number) {
    if (user1Id) {
      const activePartnership1 = await this.partnershipRepository.findOne({
        where: [
          { user1: { id: user1Id }, status: 'active' },
          { user2: { id: user1Id }, status: 'active' },
        ],
      });
      if (activePartnership1 && activePartnership1.id !== partnershipId) {
        throw new BadRequestException(`User ${user1Id} is already in an active partnership.`);
      }
    }

    if (user2Id) {
      const activePartnership2 = await this.partnershipRepository.findOne({
        where: [
          { user1: { id: user2Id }, status: 'active' },
          { user2: { id: user2Id }, status: 'active' },
        ],
      });
      if (activePartnership2 && activePartnership2.id !== partnershipId) {
        throw new BadRequestException(`User ${user2Id} is already in an active partnership.`);
      }
    }
  }
}
