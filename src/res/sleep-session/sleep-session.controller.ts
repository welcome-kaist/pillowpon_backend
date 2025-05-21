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

  @Post('end')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '수면 종료 API',
    description: '수면 세션을 종료하고 점수를 계산하여 상태를 업데이트합니다.',
  })
  @ApiBody({ schema: { example: { sleep_session_id: 1 } } })
  async endSleepSession(@Body('sleep_session_id') sessionId: number) {
    return this.sleepSessionService.endSleepSession(sessionId);
  }
}
