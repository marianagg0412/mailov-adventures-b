import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { PasswordService } from './security/PasswordService';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly passwordService: PasswordService
  ) {}

  // Validate token and return the payload (with userId)
  async validateToken(token: string): Promise<any> {
    try {
      const payload = await this.jwtService.verifyAsync(token);
      return payload; // This will return the userId or other data if the token is valid
    } catch (error) {
      return null;
    }
  }

  async login(input: { email: string; password: string }): Promise<{ accessToken: string; userId: number }> {
    // Find user by email
    const user = await this.userService.findByEmail(input.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await this.passwordService.comparePassword(input.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Create JWT payload
    const payload = { sub: user.id, userId: user.id };

    // Return the JWT token and userId
    return {
      accessToken: this.jwtService.sign(payload),
      userId: user.id,
    };
  }
}
