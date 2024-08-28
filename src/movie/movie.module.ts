import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieResolver } from './movie.resolver';
import { Type } from 'class-transformer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Partnership } from 'src/partnership/entities/partnership.entity';
import { Movie } from './entities/movie.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Movie, Partnership])],
  providers: [MovieResolver, MovieService],
})
export class MovieModule {}
