import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { MetadataService } from './metadata.service';
import { User } from 'src/decorators/user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('metadata')
export class MetadataController {
  constructor(private readonly metadataService: MetadataService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createMetadata(@Body() body, @User() user) {
    const user_id: string = user.id;
    const pressure: number = body.pressure;
    const accelerator: number = body.accelerator;
    const humidity: number = body.humidity;
    const temperature: number = body.temperature;
    const body_detection: number = body.body_detection;
    const photoresistor: number = body.photoresistor;
    const sound: number = body.sound;
    const time: Date = body.time;

    const metadata = await this.metadataService.createMetadata({
      user_id,
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
