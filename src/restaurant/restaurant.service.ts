import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { CreateRestaurantInput } from './dto/create-restaurant.input';
import { UpdateRestaurantInput } from './dto/update-restaurant.input';
import { Partnership } from '../partnership/entities/partnership.entity';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant)
    private restaurantRepository: Repository<Restaurant>,
    @InjectRepository(Partnership)
    private partnershipRepository: Repository<Partnership>,
  ) {}

  async create(createRestaurantInput: CreateRestaurantInput): Promise<Restaurant> {
    const partnershipIds = createRestaurantInput.partnershipIds;
  
    // Fetch partnerships by their IDs using findBy and In operator
    const partnerships = partnershipIds.length > 0 
      ? await this.partnershipRepository.findBy({ id: In(partnershipIds) })
      : [];
  
    // Check if all provided partnerships were found
    if (partnershipIds.length > 0 && partnerships.length !== partnershipIds.length) {
      throw new NotFoundException(`Some partnerships with IDs ${partnershipIds} not found.`);
    }
  
    // Create the restaurant entity and associate the partnerships
    const restaurant = this.restaurantRepository.create({
      ...createRestaurantInput,
      partnerships: partnerships,  // Ensure this is correctly mapped
    });
  
    // Save and return the restaurant
    return this.restaurantRepository.save(restaurant);
  }
  
  

  async findAll(): Promise<Restaurant[]> {
    return this.restaurantRepository.find({ relations: ['partnerships'] });
  }

  async findOne(id: number): Promise<Restaurant> {
    const restaurant = await this.restaurantRepository.findOne({
      where: { id },
      relations: ['partnerships'],
    });

    if (!restaurant) {
      throw new NotFoundException(`Restaurant with ID ${id} not found.`);
    }

    return restaurant;
  }

  async update(id: number, updateRestaurantInput: UpdateRestaurantInput): Promise<Restaurant> {
    const partnershipIds = updateRestaurantInput.partnershipIds;
    const rest = { ...updateRestaurantInput };
    
    // Fetch the restaurant to update
    const restaurant = await this.restaurantRepository.findOne({
      where: { id },
      relations: ['partnerships'],
    });
    
    if (!restaurant) {
      throw new NotFoundException(`Restaurant with ID ${id} not found.`);
    }
    
    // Fetch partnerships by their IDs using findBy and In operator
    const partnerships = partnershipIds.length > 0 
      ? await this.partnershipRepository.findBy({ id: In(partnershipIds) })
      : [];
    
    // Update the restaurant entity with the new partnerships
    this.restaurantRepository.merge(restaurant, rest, {
      partnerships: partnerships.length > 0 ? partnerships : restaurant.partnerships,
    });
    
    // Save and return the updated restaurant
    return this.restaurantRepository.save(restaurant);
  }
  
  
  
  

  async remove(id: number): Promise<void> {
    const restaurant = await this.findOne(id);
    if (!restaurant) {
      throw new NotFoundException(`Restaurant with ID ${id} not found.`);
    }

    try {
      await this.restaurantRepository.remove(restaurant);
    } catch (error) {
      throw new BadRequestException(`Failed to remove restaurant with ID ${id}.`);
    }
  }
}
