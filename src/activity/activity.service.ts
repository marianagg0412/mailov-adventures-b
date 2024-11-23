import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Activity } from './entities/activity.entity';
import { CreateActivityInput } from './dto/create-activity.input';
import { UpdateActivityInput } from './dto/update-activity.input';
import { User } from '../user/entities/user.entity';
import { Partnership } from '../partnership/entities/partnership.entity';

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(Activity)
    private activityRepository: Repository<Activity>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Partnership)
    private partnershipRepository: Repository<Partnership>,
  ) {}

  async create(createActivityInput: CreateActivityInput): Promise<Activity> {
    const { userId, partnershipIds, ...rest } = createActivityInput;
  
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found.`);
    }
  
    let partnerships = [];
    
    // Check if partnershipIds is defined and has elements
    if (partnershipIds && partnershipIds.length > 0) {
      partnerships = await this.partnershipRepository.findBy({ id: In(partnershipIds) });
      
      if (partnerships.length !== partnershipIds.length) {
        throw new NotFoundException(`Some partnerships with IDs ${partnershipIds} not found.`);
      }
    }
  
    const activity = this.activityRepository.create({
      ...rest,
      user,
      partnershipIds: partnerships,
    });
  
    return this.activityRepository.save(activity);
  }
  
  async findByPartnership(partnershipId: number): Promise<Activity[]> {
    return this.activityRepository
      .createQueryBuilder('activity')
      .leftJoinAndSelect('activity.partnershipIds', 'partnership')
      .leftJoinAndSelect('activity.user', 'user') // Add this to join user if needed
      .where('partnership.id = :partnershipId', { partnershipId })
      .getMany();
  }

  async findAll(): Promise<Activity[]> {
    return this.activityRepository.find({ relations: ['user', 'partnershipIds'] });
  }

  async findOne(id: number): Promise<Activity> {
    const activity = await this.activityRepository.findOne({
      where: { id },
      relations: ['user', 'partnershipIds'],
    });

    if (!activity) {
      throw new NotFoundException(`Activity with ID ${id} not found.`);
    }

    return activity;
  }

  async update(id: number, updateActivityInput: UpdateActivityInput): Promise<Activity> {
    const { userId, partnershipIds, ...rest } = updateActivityInput;
  
    const activity = await this.activityRepository.findOne({
      where: { id },
      relations: ['user', 'partnershipIds'],
    });
  
    if (!activity) {
      throw new NotFoundException(`Activity with ID ${id} not found.`);
    }
  
    if (userId !== undefined) {
      const user = await this.userRepository.findOne({ where: { id: userId } });
      if (!user) {
        throw new NotFoundException(`User with ID ${userId} not found.`);
      }
      activity.user = user;
    }
    
    let partnerships = activity.partnershipIds;
  
    // If partnershipIds is provided, update the partnerships
    if (partnershipIds && partnershipIds.length > 0) {
      partnerships = await this.partnershipRepository.findBy({ id: In(partnershipIds) });
  
      if (partnerships.length !== partnershipIds.length) {
        throw new NotFoundException(`Some partnerships with IDs ${partnershipIds} not found.`);
      }
      activity.partnershipIds = partnerships;
    }
    this.activityRepository.merge(activity, rest);
    return this.activityRepository.save(activity);
  }
  

  async remove(id: number): Promise<void> {
    const activity = await this.activityRepository.findOne({
      where: { id: id },
      relations: ['partnershipIds'], // Make sure 'partnerships' is included here
    });
    if (!activity) {
      throw new NotFoundException(`Activity with ID ${id} not found.`);
    }

    try {
      await this.activityRepository.remove(activity);
    } catch (error) {
      throw new BadRequestException(`Failed to remove Activity with ID ${id}.`);
    }
  }
}
