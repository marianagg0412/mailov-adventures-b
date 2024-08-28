import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { Public } from 'src/Auth/decorators/public.decorator';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  @Public()
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput
  ): Promise<User> {
    return this.userService.create(createUserInput);
  }

  @Query(() => [User], { name: 'findAllUsers' })
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Query(() => User, { name: 'findUserById' })
  async findOne(@Args('id', { type: () => Int }) id: number): Promise<User> {
    return this.userService.findOne(id);
  }

  @Mutation(() => User)
  async updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput
  ): Promise<User> {
    return this.userService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => Boolean) // Changed return type to Boolean
  async removeUser(@Args('id', { type: () => Int }) id: number): Promise<boolean> {
    try {
      await this.userService.remove(id);
      return true;
    } catch (error) {
      return false; // Optionally handle error or throw
    }
  }
}
