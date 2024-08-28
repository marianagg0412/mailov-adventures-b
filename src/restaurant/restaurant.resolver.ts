import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RestaurantService } from './restaurant.service';
import { Restaurant } from './entities/restaurant.entity';
import { CreateRestaurantInput } from './dto/create-restaurant.input';
import { UpdateRestaurantInput } from './dto/update-restaurant.input';

@Resolver(() => Restaurant)
export class RestaurantResolver {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Mutation(() => Restaurant)
  async createRestaurant(
    @Args('createRestaurantInput') createRestaurantInput: CreateRestaurantInput
  ): Promise<Restaurant> {
    return this.restaurantService.create(createRestaurantInput);
  }

  @Query(() => [Restaurant], { name: 'restaurants' })
  async findAll(): Promise<Restaurant[]> {
    return this.restaurantService.findAll();
  }

  @Query(() => Restaurant, { name: 'restaurant' })
  async findOne(@Args('id', { type: () => Int }) id: number): Promise<Restaurant> {
    return this.restaurantService.findOne(id);
  }

  @Mutation(() => Restaurant)
  async updateRestaurant(
    @Args('id', { type: () => Int }) id: number, //Id restaurant
    @Args('updateRestaurantInput') updateRestaurantInput: UpdateRestaurantInput //Inside, ids partnerships
  ): Promise<Restaurant> {
    return this.restaurantService.update(id, updateRestaurantInput);
  }

  @Mutation(() => Boolean)
  async removeRestaurant(@Args('id', { type: () => Int }) id: number): Promise<boolean> {
    await this.restaurantService.remove(id);
    return true;
  }
}
