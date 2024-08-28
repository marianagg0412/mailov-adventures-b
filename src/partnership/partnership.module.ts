import { Module } from '@nestjs/common';
import { PartnershipService } from './partnership.service';
import { PartnershipResolver } from './partnership.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Partnership } from './entities/partnership.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Partnership, User])],
  providers: [PartnershipResolver, PartnershipService],
  exports: [PartnershipService],
})
export class PartnershipModule {}
