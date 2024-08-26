import { Module } from '@nestjs/common';
import { PartnershipService } from './partnership.service';
import { PartnershipResolver } from './partnership.resolver';

@Module({
  providers: [PartnershipResolver, PartnershipService],
})
export class PartnershipModule {}
