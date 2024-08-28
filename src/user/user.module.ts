import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PasswordService } from 'src/Auth/security/PasswordService';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, UserResolver, PasswordService],
  exports: [UserService],
})
export class UserModule {}
