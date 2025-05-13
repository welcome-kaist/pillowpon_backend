import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(user_id: string, password: string) {
    const user = await this.userRepository.findOne({
      where: { user_id: user_id },
    });

    if (!user) {
      throw new BadRequestException('user id not exists');
    }

    // verify password
    const isPasswordMatch = await compare(password, user.password);

    if (!isPasswordMatch) {
      throw new BadRequestException('password hash does not match');
    }

    return {
      user_id: user.user_id,
      email: user.email,
      name: user.name,
      age: user.age,
      gender: user.gender,
    };
  }
  async logIn(user) {
    return {
      accessToken: this.jwtService.sign(user),
    };
  }
}
