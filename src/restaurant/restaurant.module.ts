import { Module } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { RestaurantResolver } from './restaurant.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { Partnership } from 'src/partnership/entities/partnership.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant, Partnership])],
  providers: [RestaurantResolver, RestaurantService],
})
export class RestaurantModule {}
