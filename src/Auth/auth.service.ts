import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UserService // Inject the UsersService to fetch user details
  ) {}

  // async validateToken(token: string): Promise<any> {
  //   try {
  //     const tokenPayload = await this.jwtService.verifyAsync(token);
  //     console.log("dddd");
  //     console.log(tokenPayload);
  //     return tokenPayload;
  //   } catch (error) {
  //     return null;
  //   }
  // }

  // async login(user: any): Promise<{ accessToken: string }> {
  //   const userFromDb = await this.usersService.findOne(user.userId); // Ensure this fetches the correct user
    
  //   console.log(userFromDb);
  //   const payload = {
  //     username: userFromDb.email, // Make sure this is accurate
  //     sub: userFromDb.id, // Ensure this matches your user ID
  //     roles: userFromDb.roles.map(role => role.name), // Ensure role names are correctly mapped
  //   };
  //   console.log("bbb");
  //   console.log(payload);
  //   console.log("cccc");
  //   console.log(payload.roles);
  
  //   return {
  //     accessToken: this.jwtService.sign(payload),
  //   };
  // }
  
}
