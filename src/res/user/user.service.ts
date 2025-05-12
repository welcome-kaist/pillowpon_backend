import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async register(
    user_id: string,
    name: string,
    email: string,
    age: number,
    gender: string,
  ): Promise<UserEntity> {
    const existedUser = await this.userRepository.findOne({
      where: {
        email: email,
      },
    });

    if (existedUser) {
      throw new BadRequestException('existing email address');
    }

    const user = await this.userRepository.save({
      user_id: user_id,
      name: name,
      email: email,
      age: age,
      gender: gender,
    });

    return user;
  }
}
