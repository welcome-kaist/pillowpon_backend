import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MetadataEntity } from 'src/entities/metadata.entity';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MetadataService {
  constructor(
    @InjectRepository(MetadataEntity)
    private readonly metadataRepository: Repository<MetadataEntity>,

    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createMetadata(data: {
    user_id: string;
    pressure: number;
    accelerator: number;
    humidity: number;
    temperature: number;
    body_detection: number;
    photoresistor: number;
    sound: number;
    time: Date;
  }): Promise<MetadataEntity> {
    const user = await this.userRepository.findOneBy({ user_id: data.user_id });
    if (!user) {
      throw new NotFoundException(`User with ID ${data.user_id} not found`);
    }

    const metadata = this.metadataRepository.create({
      ...data,
      user,
    });

    delete (metadata as any).user_id;

    return await this.metadataRepository.save(metadata);
  }
}
