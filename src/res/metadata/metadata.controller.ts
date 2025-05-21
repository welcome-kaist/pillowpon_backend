import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { MetadataService } from './metadata.service';
import { User } from 'src/decorators/user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateMetadataDTO } from 'src/dtos/metadata/create-metadata.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Metadata API')
@Controller('metadata')
export class MetadataController {
  constructor(private readonly metadataService: MetadataService) {}

  @ApiOperation({
    summary: 'Metadata 저장 API',
    description: '현재 로그인 된 user에 metadata 저장',
  })
  @ApiBody({
    type: CreateMetadataDTO,
  })
  @Post()
  async createMetadata(@Body() body: CreateMetadataDTO) {
    const sleep_session_id: number = body.sleep_session_id;
    const pressure: number = body.pressure;
    const accelerator: number = body.accelerator;
    const humidity: number = body.humidity;
    const temperature: number = body.temperature;
    const body_detection: number = body.body_detection;
    const photoresistor: number = body.photoresistor;
    const sound: number = body.sound;
    const time: Date = body.time;

    const metadata = await this.metadataService.createMetadata({
      sleep_session_id,
      pressure,
      accelerator,
      humidity,
      temperature,
      body_detection,
      photoresistor,
      sound,
      time,
    });

    return metadata;
  }
}
