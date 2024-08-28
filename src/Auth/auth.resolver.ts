import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-input.dto';
import { AuthResponseDto } from './dto/login-response.dto';
import { Public } from './decorators/public.decorator';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponseDto)
  @Public()
  async login(@Args('input') input: LoginDto): Promise<AuthResponseDto> {
    const { accessToken } = await this.authService.login(input);
    return { accessToken };
  }

  @Mutation(() => Boolean)
  async validate(@Args('token') token: string): Promise<boolean> {
    const user = await this.authService.validateToken(token);
    return !!user; // Return true if user exists
  }
}
