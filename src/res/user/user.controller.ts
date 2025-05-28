import { Body, Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
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
    const { email, password, name, age, gender } = body;

    return this.userService.register(email, password, name, age, gender);
  }

  @Get()
  @ApiOperation({
    summary: '전체 사용자 조회',
    description: '모든 유저 정보를 반환',
  })
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Delete()
  @ApiOperation({
    summary: '사용자 삭제',
    description: 'email로 특정 사용자 삭제',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'test@kaist.ac.kr' },
      },
    },
  })
  async deleteUser(@Body('email') email: string) {
    return this.userService.deleteUserByEmail(email);
  }
}
