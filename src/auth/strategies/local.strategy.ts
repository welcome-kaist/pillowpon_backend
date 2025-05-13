import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'user_id',
      passwordField: 'password',
    });
  }

  async validate(user_id: string, password: string) {
    const user = await this.authService.validateUser(user_id, password);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
