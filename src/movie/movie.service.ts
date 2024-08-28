import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './entities/movie.entity';
import { CreateMovieInput } from './dto/create-movie.input';
import { UpdateMovieInput } from './dto/update-movie.input';
import { Partnership } from '../partnership/entities/partnership.entity';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,
    @InjectRepository(Partnership)
    private partnershipRepository: Repository<Partnership>,
  ) {}

  async create(createMovieInput: CreateMovieInput): Promise<Movie> {
    const { partnershipId, ...rest } = createMovieInput;

    const partnership = await this.partnershipRepository.findOne({ where: { id: partnershipId } });
    if (!partnership) {
      throw new NotFoundException(`Partnership with ID ${partnershipId} not found.`);
    }

    const movie = this.movieRepository.create({
      ...rest,
      partnerships: [partnership],
    });

    return this.movieRepository.save(movie);
  }

  async findAll(): Promise<Movie[]> {
    return this.movieRepository.find({ relations: ['partnerships'] });
  }

  async findOne(id: number): Promise<Movie> {
    const movie = await this.movieRepository.findOne({
      where: { id },
      relations: ['partnerships'],
    });

    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found.`);
    }

    return movie;
  }

  async update(id: number, updateMovieInput: UpdateMovieInput): Promise<Movie> {
    const movie = await this.movieRepository.preload({
      id,
      ...updateMovieInput,
    });

    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found.`);
    }

    return this.movieRepository.save(movie);
  }

  async remove(id: number): Promise<void> {
    const movie = await this.findOne(id);
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found.`);
    }

    try {
      await this.movieRepository.remove(movie);
    } catch (error) {
      throw new BadRequestException(`Failed to remove movie with ID ${id}.`);
    }
  }
}
