import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetadataEntity } from 'src/entities/metadata.entity';
import { MetadataController } from './metadata.controller';
import { MetadataService } from './metadata.service';

@Module({
  imports: [TypeOrmModule.forFeature([MetadataEntity])],
  controllers: [MetadataController],
  providers: [MetadataService],
})
export class MetadataModule {}
