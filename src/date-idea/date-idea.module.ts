import { Module } from '@nestjs/common';
import { DateIdeaService } from './date-idea.service';
import { DateIdeaResolver } from './date-idea.resolver';

@Module({
  providers: [DateIdeaResolver, DateIdeaService],
})
export class DateIdeaModule {}
