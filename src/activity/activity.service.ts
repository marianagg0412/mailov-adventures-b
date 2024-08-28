import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
    const { userId, partnershipId, ...rest } = createActivityInput;

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found.`);
    }

    const partnership = await this.partnershipRepository.findOne({ where: { id: partnershipId } });
    if (!partnership) {
      throw new NotFoundException(`Partnership with ID ${partnershipId} not found.`);
    }

    const activity = this.activityRepository.create({
      ...rest,
      user,
      partnerships: [partnership],
    });

    return this.activityRepository.save(activity);
  }

  async findAll(): Promise<Activity[]> {
    return this.activityRepository.find({ relations: ['user', 'partnerships'] });
  }

  async findOne(id: number): Promise<Activity> {
    const activity = await this.activityRepository.findOne({
      where: { id },
      relations: ['user', 'partnerships'],
    });

    if (!activity) {
      throw new NotFoundException(`Activity with ID ${id} not found.`);
    }

    return activity;
  }

  async update(id: number, updateActivityInput: UpdateActivityInput): Promise<Activity> {
    const activity = await this.activityRepository.preload({
      id,
      ...updateActivityInput,
    });

    if (!activity) {
      throw new NotFoundException(`Activity with ID ${id} not found.`);
    }

    return this.activityRepository.save(activity);
  }

  async remove(id: number): Promise<void> {
    const activity = await this.findOne(id);
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
