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
    if (!metadataList || metadataList.length === 0) {
      return 0;
    }

    const tempAvg =
      metadataList.reduce((sum, m) => sum + (m.temperature ?? 0), 0) /
      metadataList.length;
    const lmAvg =
      metadataList.reduce((sum, m) => sum + (m.accelerator ?? 0), 0) /
      metadataList.length;
    const hrAvg =
      metadataList.reduce((sum, m) => sum + (m.body_detection ?? 0), 0) /
      metadataList.length;

    const temp_mean = 25;
    const temp_std = 1;
    const hr_mean = 7;
    const hr_std = 1;
    const lm_mean = 11;
    const lm_std = 1;

    const lm = (lmAvg - lm_mean) / lm_std;
    const t = (tempAvg - temp_mean) / temp_std;
    const sr = (hrAvg - hr_mean) / hr_std;

    const rawScore = 25 * (lm * 0.660157 + t * -0.270903 + sr * -0.52088 + 2.0);
    return Math.max(0, Math.min(100, 100 - rawScore));
  }

  async createSleepSession(data: { id: string }) {
    const existingSession = await this.sleepSessionRepository.findOne({
      where: {
        user: { id: data.id },
        sleep_status: 'ongoing',
      },
    });

    if (existingSession) {
      return existingSession;
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

  async getSleepScore(sessionId: number) {
    const session = await this.sleepSessionRepository.findOne({
      where: { id: sessionId },
      relations: ['metadata'],
    });

    if (!session) {
      throw new NotFoundException(`Sleep session ${sessionId} not found`);
    }

    const metadataList = session.metadata;
    const sleepScore = this.calculateSleepScore(metadataList);

    return { depth: sleepScore, time: new Date() };
  }
}
