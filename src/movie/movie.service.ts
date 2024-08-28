import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
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
    const partnershipIds = createMovieInput.partnershipIds;
  
    // Initialize partnerships as an empty array
    let partnerships = [];
  
    // If partnershipIds is provided, process it
    if (partnershipIds && partnershipIds.length > 0) {
      partnerships = await this.partnershipRepository.findBy({ id: In(partnershipIds) });
  
      if (partnershipIds.length > 0 && partnerships.length !== partnershipIds.length) {
        throw new NotFoundException(`Some partnerships with IDs ${partnershipIds} not found.`);
      }
    }
  
    const movie = this.movieRepository.create({
      ...createMovieInput,
      priority: createMovieInput.priority || 'low',
      partnerships: partnerships,
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
    const { partnershipIds, ...rest } = updateMovieInput;
  
    // Find the movie by its ID
    const movie = await this.movieRepository.findOne({
      where: { id },
      relations: ['partnerships'],
    });
  
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found.`);
    }
  
    // Handle the case where partnershipIds is undefined
    let partnerships = [];
    if (partnershipIds) {
      partnerships = partnershipIds.length > 0 
        ? await this.partnershipRepository.findBy({ id: In(partnershipIds) })
        : [];
  
      if (partnershipIds.length > 0 && partnerships.length !== partnershipIds.length) {
        throw new NotFoundException(`Some partnerships with IDs ${partnershipIds} not found.`);
      }
    }
  
    // Merge the updates into the movie entity
    this.movieRepository.merge(movie, rest, {
      partnerships: partnerships.length > 0 ? partnerships : movie.partnerships,
    });
  
    // Save the updated movie entity
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
