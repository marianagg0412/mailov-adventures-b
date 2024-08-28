import { Module } from '@nestjs/common';
import { PetService } from './pet.service';
import { PetResolver } from './pet.resolver';
import { Pet } from './entities/pet.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Partnership } from 'src/partnership/entities/partnership.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pet, Partnership])],
  providers: [PetResolver, PetService],
})
export class PetModule {}
