import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MetadataEntity } from 'src/entities/metadata.entity';
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

  calculateSleepScore(metadataList: MetadataEntity[]): number {
    // TODO: sleep score 계산
    return 0;
  }

  async createSleepSession(data: { id: string }) {
    const existingSession = await this.sleepSessionRepository.findOne({
      where: {
        user: { id: data.id },
        sleep_status: 'ongoing',
      },
    });

    if (existingSession) {
      throw new BadRequestException('이미 진행 중인 수면 세션이 존재합니다.');
    }

    const user = await this.userRepository.findOneBy({ id: data.id });
    if (!user) {
      throw new NotFoundException(`User with ID ${data.id} not found`);
    }
    const session = this.sleepSessionRepository.create({
      user,
      sleep_score: 0,
      sleep_status: 'ongoing',
      start_time: new Date(),
    });

    return this.sleepSessionRepository.save(session);
  }

  async endSleepSession(sessionId: number): Promise<SleepSessionEntity> {
    const session = await this.sleepSessionRepository.findOne({
      where: { id: sessionId },
      relations: ['metadata'],
    });

    if (!session) {
      throw new NotFoundException(`Sleep session ${sessionId} not found`);
    }

    if (session.sleep_status === 'completed') {
      throw new BadRequestException('이미 종료된 수면 세션입니다.');
    }

    const metadataList = session.metadata;

    const sleepScore = this.calculateSleepScore(metadataList);

    session.sleep_score = sleepScore;
    session.sleep_status = 'completed';
    session.end_time = new Date();

    return this.sleepSessionRepository.save(session);
  }

  async getSessionsByUser(id: string): Promise<SleepSessionEntity[]> {
    return this.sleepSessionRepository.find({
      where: { user: { id } },
      relations: ['metadata'],
      order: { start_time: 'DESC' },
    });
  }
}
