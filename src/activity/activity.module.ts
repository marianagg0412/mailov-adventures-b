import { Module } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { ActivityResolver } from './activity.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Partnership } from 'src/partnership/entities/partnership.entity';
import { User } from 'src/user/entities/user.entity';
import { Activity } from './entities/activity.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Activity, User, Partnership])],
  providers: [ActivityResolver, ActivityService],
})
export class ActivityModule {}
