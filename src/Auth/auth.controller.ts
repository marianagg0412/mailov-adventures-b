import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @Post('login')
  // async login(@Body() loginDto: LoginDto): Promise<AuthResponseDto> {
  //   return this.authService.login(loginDto);
  // }

  // @UseGuards(JwtAuthGuard)
  // @Post('validate')
  // async validate(@Body() token: string): Promise<any> {
  //   return this.authService.validateToken(token);
  // }
}
