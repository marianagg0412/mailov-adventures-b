// src/auth/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UserService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET, // Replace with your secret
    });
  }

  // async validate(payload: any) {
  //   // Fetch user from DB and return user data
  //   const user = await this.usersService.findOne(payload.sub);
  //   if (!user) {
  //     return null;
  //   }
  //   return { ...user, roles: payload.roles }; // Attach roles to user
  // }
}
