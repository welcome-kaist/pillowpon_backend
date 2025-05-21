import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetadataEntity } from 'src/entities/metadata.entity';
import { MetadataController } from './metadata.controller';
import { MetadataService } from './metadata.service';
import { UserEntity } from 'src/entities/user.entity';
import { SleepSessionEntity } from 'src/entities/sleep-session.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([MetadataEntity, UserEntity, SleepSessionEntity]),
  ],
  controllers: [MetadataController],
  providers: [MetadataService],
})
export class MetadataModule {}
