import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';

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
    const email = body?.email;
    const name = body?.name;
    const age = body?.age;
    const gender = body?.gender;

    return this.userService.register(user_id, email, name, age, gender);
  }
}
