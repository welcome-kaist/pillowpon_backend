import { PickType } from '@nestjs/swagger';
import { MetadataEntity } from 'src/entities/metadata.entity';

export class CreateMetadataDTO extends PickType(MetadataEntity, [
  'pressure',
  'accelerator',
  'humidity',
  'temperature',
  'body_detection',
  'photoresistor',
  'sound',
  'time',
]) {}
