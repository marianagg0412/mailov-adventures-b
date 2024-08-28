import { Module, Global } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.estrategy';
import { AuthResolver } from './auth.resolver';
import { UserModule } from '../user/user.module';  // Import UserModule

@Global()
@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRATION_TIME') },
      }),
    }),
    UserModule,  // Import UserModule to make UserService available
  ],
  providers: [AuthService, JwtStrategy, AuthResolver],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
