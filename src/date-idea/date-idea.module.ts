import { Module } from '@nestjs/common';
import { DateIdeaService } from './date-idea.service';
import { DateIdeaResolver } from './date-idea.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Partnership } from 'src/partnership/entities/partnership.entity';
import { User } from 'src/user/entities/user.entity';
import { DateIdea } from './entities/date-idea.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DateIdea, User, Partnership])],
  providers: [DateIdeaResolver, DateIdeaService],
})
export class DateIdeaModule {}
