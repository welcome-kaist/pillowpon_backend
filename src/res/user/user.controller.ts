import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/main')
  async getMainPage() {
    return 'pillowpon backend';
  }

  @Post('register')
  async register(@Body() body) {
    const user_id = body?.user_id;
    const password = body?.password;
    const email = body?.email;
    const name = body?.name;
    const age = body?.age;
    const gender = body?.gender;

    return this.userService.register(
      user_id,
      password,
      email,
      name,
      age,
      gender,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('user-info')
  async getUserInfo() {
    return 'user-info Page';
  }
}
