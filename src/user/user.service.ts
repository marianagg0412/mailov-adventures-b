import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { PasswordService } from 'src/Auth/security/PasswordService';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly passwordService: PasswordService,
  ) {}

  async create(createUserInput: CreateUserInput): Promise<User> {
    // Check if a user with the given email already exists
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserInput.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await this.passwordService.hashPassword(createUserInput.password);
    
    // Create a new user with the hashed password
    const newUser = this.userRepository.create({ ...createUserInput, password: hashedPassword });

    try {
      return await this.userRepository.save(newUser);
    } catch (error) {
      throw new BadRequestException('Failed to create user');
    }
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find({
      relations: [
        'partnershipsAsUser1',
        'partnershipsAsUser2',
        'facts',
        'dateIdeas',
        'questions',
        'activities',
      ],
    });
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: [
        'partnershipsAsUser1',
        'partnershipsAsUser2',
        'facts',
        'dateIdeas',
        'questions',
        'activities',
      ],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }

    return user;
  }

  async update(id: number, updateUserInput: UpdateUserInput): Promise<User> {
    const user = await this.userRepository.preload({
      id,
      ...updateUserInput,
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }

    // Check if the email is being updated and if it already exists
    if (updateUserInput.email) {
      const existingUser = await this.userRepository.findOne({
        where: { email: updateUserInput.email },
      });

      if (existingUser && existingUser.id !== id) {
        throw new ConflictException('Email already exists');
      }
    }

    try {
      return await this.userRepository.save(user);
    } catch (error) {
      throw new BadRequestException('Failed to update user');
    }
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }

    try {
      await this.userRepository.remove(user);
    } catch (error) {
      throw new BadRequestException(`Failed to remove user with ID ${id}.`);
    }
  }
}