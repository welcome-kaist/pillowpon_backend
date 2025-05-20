import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMetadataDTO } from 'src/dtos/metadata/create-metadata.dto';
import { SleepSessionEntity } from 'src/entities/sleep-session.entity';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SleepSessionService {
  constructor(
    @InjectRepository(SleepSessionEntity)
    private readonly sleepSessionRepository: Repository<SleepSessionEntity>,

    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  calculateSleepScore(dto: CreateMetadataDTO): number {
    // TODO: sleep score 계산
    return 0;
  }

  async createSleepSession(data: { user_id: string }) {
    //TODO: 이미 ongoing 상태인 session이 있는지 확인하고 있으면 오류
    const user = await this.userRepository.findOneBy({ user_id: data.user_id });
    if (!user) {
      throw new NotFoundException(`User with ID ${data.user_id} not found`);
    }
    const session = this.sleepSessionRepository.create({
      ...data,
      user,
    });

    delete (session as any).user_id;
    return this.sleepSessionRepository.save(session);
  }
}
