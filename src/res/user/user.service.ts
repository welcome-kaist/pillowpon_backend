import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { hash } from 'bcrypt';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly authService: AuthService,
  ) {}

  async register(
    email: string,
    password: string,
    name: string,
    age: number,
    gender: string,
  ) {
    const hashedPassword = await hash(password, 10);

    const existedUser = await this.userRepository.findOne({
      where: {
        email: email,
      },
    });

    if (existedUser) {
      throw new BadRequestException('user id already exists');
    }

    const user = await this.userRepository.save({
      name: name,
      password: hashedPassword,
      email: email,
      age: age,
      gender: gender,
    });

    const token = await this.authService.logIn(user);
    return token;
  }

  async getAllUsers(): Promise<UserEntity[]> {
    return this.userRepository.find({
      order: { email: 'ASC' },
    });
  }

  async deleteUserByEmail(email: string): Promise<{ message: string }> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    await this.userRepository.delete({ email });
    return { message: `User with email ${email} has been deleted` };
  }
}
