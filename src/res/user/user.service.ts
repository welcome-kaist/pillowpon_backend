import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async register(
    email: string,
    password: string,
    name: string,
    age: number,
    gender: string,
  ): Promise<UserEntity> {
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

    return user;
  }

  async getAllUsers(): Promise<UserEntity[]> {
    return this.userRepository.find({
      order: { email: 'ASC' },
    });
  }
}
