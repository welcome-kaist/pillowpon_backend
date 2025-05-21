import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMetadataDTO } from 'src/dtos/metadata/create-metadata.dto';
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

  async createSleepSession(data: { user_id: string }) {
    const existingSession = await this.sleepSessionRepository.findOne({
      where: {
        user: { user_id: data.user_id },
        sleep_status: 'ongoing',
      },
    });

    if (existingSession) {
      throw new BadRequestException('이미 진행 중인 수면 세션이 존재합니다.');
    }

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

    // 1. 관련 metadata 조회
    const metadataList = session.metadata;
    if (!metadataList || metadataList.length === 0) {
      throw new BadRequestException('해당 세션에 메타데이터가 없습니다.');
    }

    // 2. 점수 계산
    const sleepScore = calculateSleepScore(metadataList);

    // 3. 상태 업데이트
    session.sleep_score = sleepScore;
    session.sleep_status = 'completed';
    session.end_time = new Date();

    return this.sleepRepo.save(session);
  }
}
