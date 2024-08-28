import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionResolver } from './question.resolver';
import { User } from 'src/user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Partnership } from 'src/partnership/entities/partnership.entity';
import { Question } from './entities/question.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Question, Partnership, User])],
  providers: [QuestionResolver, QuestionService],
})
export class QuestionModule {}
