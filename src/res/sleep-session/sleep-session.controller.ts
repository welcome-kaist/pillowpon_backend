import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { SleepSessionService } from './sleep-session.service';
import { User } from 'src/decorators/user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateMetadataDTO } from 'src/dtos/metadata/create-metadata.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SleepSessionEntity } from 'src/entities/sleep-session.entity';

@ApiTags('SleepSession API')
@Controller('sleep-session')
export class SleepSessionController {
  constructor(private readonly sleepSessionService: SleepSessionService) {}

  @ApiOperation({
    summary: '수면 시작 API',
    description: '수면 세션을 시작하고 세션 ID를 반환',
  })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Post('start')
  async createSleepSession(@User() user) {
    console.log('>>> USER:', user);
    const sleepSession = await this.sleepSessionService.createSleepSession({
      user_id: user.id,
    });

    return sleepSession;
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Post('end')
  @ApiOperation({
    summary: '수면 종료 API',
    description: '수면 세션을 종료하고 점수를 계산하여 상태를 업데이트',
  })
  @ApiBody({ schema: { example: { sleep_session_id: 1 } } })
  async endSleepSession(@Body('sleep_session_id') sessionId: number) {
    return this.sleepSessionService.endSleepSession(sessionId);
  }
}
