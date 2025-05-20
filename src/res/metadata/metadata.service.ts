import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MetadataEntity } from 'src/entities/metadata.entity';
import { SleepSessionEntity } from 'src/entities/sleep-session.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MetadataService {
  constructor(
    @InjectRepository(MetadataEntity)
    private readonly metadataRepository: Repository<MetadataEntity>,

    @InjectRepository(SleepSessionEntity)
    private readonly sleepSessionRepository: Repository<SleepSessionEntity>,
  ) {}

  async createMetadata(data: {
    sleep_session_id: number;
    pressure: number;
    accelerator: number;
    humidity: number;
    temperature: number;
    body_detection: number;
    photoresistor: number;
    sound: number;
    time: Date;
  }): Promise<MetadataEntity> {
    const sleepSession = await this.sleepSessionRepository.findOneBy({
      id: data.sleep_session_id,
    });
    if (!sleepSession) {
      throw new NotFoundException(
        `Sleep Session with ID ${data.sleep_session_id} not found`,
      );
    }

    const metadata = this.metadataRepository.create({
      ...data,
      sleep_session: sleepSession,
    });

    delete (metadata as any).sleep_session_id;

    return await this.metadataRepository.save(metadata);
  }
}
