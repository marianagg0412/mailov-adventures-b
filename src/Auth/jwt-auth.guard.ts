import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './decorators/public.decorator'; // Ensure the path is correct

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector, // Reflector to check metadata
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true; // Allow access if the route is public
    }

    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('No token found');
    }

    try {
      const user = await this.jwtService.verifyAsync(token);
      request.user = user;  // Attach user to the request object
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
