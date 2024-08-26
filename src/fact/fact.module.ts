import { Module } from '@nestjs/common';
import { FactService } from './fact.service';
import { FactResolver } from './fact.resolver';

@Module({
  providers: [FactResolver, FactService],
})
export class FactModule {}
