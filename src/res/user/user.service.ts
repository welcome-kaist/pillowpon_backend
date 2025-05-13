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
    user_id: string,
    password: string,
    name: string,
    email: string,
    age: number,
    gender: string,
  ): Promise<UserEntity> {
    const hashedPassword = await hash(password, 10);

    const existedUser = await this.userRepository.findOne({
      where: {
        user_id: user_id,
      },
    });

    if (existedUser) {
      throw new BadRequestException('user id already exists');
    }

    const user = await this.userRepository.save({
      user_id: user_id,
      name: name,
      password: hashedPassword,
      email: email,
      age: age,
      gender: gender,
    });

    return user;
  }
}
