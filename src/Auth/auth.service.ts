import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService
  ) {}

  async validateToken(token: string): Promise<any> {
    try {
      const payload = await this.jwtService.verifyAsync(token);
      return payload;
    } catch (error) {
      return null;
    }
  }

  async login(user: any): Promise<{ accessToken: string }> {
    const userFromDb = await this.userService.findOne(user.userId);
    const payload = { sub: userFromDb.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
