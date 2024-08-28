import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { MovieService } from './movie.service';
import { Movie } from './entities/movie.entity';
import { CreateMovieInput } from './dto/create-movie.input';
import { UpdateMovieInput } from './dto/update-movie.input';

@Resolver(() => Movie)
export class MovieResolver {
  constructor(private readonly movieService: MovieService) {}

  @Mutation(() => Movie)
  createMovie(@Args('createMovieInput') createMovieInput: CreateMovieInput) {
    return this.movieService.create(createMovieInput);
  }

  @Query(() => [Movie], { name: 'movies' })
  findAll() {
    return this.movieService.findAll();
  }

  @Query(() => Movie, { name: 'movie' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.movieService.findOne(id);
  }

  @Mutation(() => Movie)
  updateMovie(
    @Args('id', { type: () => ID }) id: number,
    @Args('updateMovieInput') updateMovieInput: UpdateMovieInput) {
    return this.movieService.update(id, updateMovieInput);
  }

  @Mutation(() => Boolean)
  async removeMovie(@Args('id', { type: () => ID }) id: number) {
    await this.movieService.remove(id);
    return true;
  }
}
