import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { SleepSessionService } from './sleep-session.service';
import { User } from 'src/decorators/user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateMetadataDTO } from 'src/dtos/metadata/create-metadata.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SleepSessionEntity } from 'src/entities/sleep-session.entity';

@ApiTags('SleepSession API')
@Controller('sleep-session')
export class SleepSessionController {
  constructor(private readonly sleepSessionService: SleepSessionService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Metadata 저장 API',
    description: '현재 로그인 된 user에 metadata 저장',
  })
  @ApiBody({ type: CreateMetadataDTO })
  async createSleepSession(@User() user) {
    const sleepSession = await this.sleepSessionService.createSleepSession({
      user_id: user.id,
    });

    return sleepSession;
  }
}
