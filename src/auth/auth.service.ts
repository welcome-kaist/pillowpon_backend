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

  async validateUser(email: string, password: string) {
    const user = await this.userRepository.findOne({
      where: { email: email },
    });
    console.log(email, password);
    console.log(user);
    if (!user) {
      throw new BadRequestException('email not exists');
    }

    // verify password
    const isPasswordMatch = await compare(password, user.password);

    if (!isPasswordMatch) {
      throw new BadRequestException('password hash does not match');
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      age: user.age,
      gender: user.gender,
    };
  }
  async logIn(user) {
    return {
      user: user,
      accessToken: this.jwtService.sign(user),
    };
  }
}
