import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { LoginDto } from 'src/dtos/auth/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: '로그인 API',
    description: 'user id 와 password로 local login',
  })
  @ApiBody({ type: LoginDto })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async logIn(@Req() req) {
    const user = req?.user;

    console.log('user : ', user);

    return this.authService.logIn(user);
  }
}
