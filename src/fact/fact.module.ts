import { Module } from '@nestjs/common';
import { FactService } from './fact.service';
import { FactResolver } from './fact.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Fact } from './entities/fact.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Fact, User])],
  providers: [FactResolver, FactService],
})
export class FactModule {}
