import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RegisterDTO } from 'src/dtos/user/register.dto';

@ApiTags('User API')
@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: 'User 등록 API',
    description: 'User 정보로 회원가입',
  })
  @ApiBody({
    type: RegisterDTO,
  })
  @ApiBearerAuth('access-token')
  @Post('register')
  async register(@Body() body: RegisterDTO) {
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

  @Get()
  @ApiOperation({
    summary: '전체 사용자 조회',
    description: '모든 유저 정보를 반환',
  })
  async getAllUsers() {
    return this.userService.getAllUsers();
  }
}
