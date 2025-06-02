import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { SleepSessionService } from './sleep-session.service';
import { User } from 'src/decorators/user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateMetadataDTO } from 'src/dtos/metadata/create-metadata.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
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
  @Post()
  async createSleepSession(@User() user) {
    console.log('>>> USER:', user);
    const sleepSession = await this.sleepSessionService.createSleepSession({
      id: user.id,
    });

    return sleepSession;
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: '수면 종료 API',
    description: '수면 세션을 종료하고 점수를 계산하여 상태를 업데이트',
  })
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiParam({ name: 'id', description: '종료할 수면 세션의 ID' })
  async endSleepSession(@Param('id') sessionId: number) {
    return await this.sleepSessionService.endSleepSession(sessionId);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({
    summary: '수면 세션 전체 조회 API',
    description: '현재 로그인한 사용자의 모든 수면 세션을 조회',
  })
  async getSleepSessions(@User() user) {
    return this.sleepSessionService.getSessionsByUser(user.id);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard)
  @Get(':id/score')
  @ApiParam({ name: 'id', description: '조회할 수면 세션의 ID' })
  @ApiOperation({
    summary: '수면 점수 조회 API',
    description: '특정 수면 세션의 수면 점수를 조회',
  })
  async getSleepScore(@Param('id') sessionId: number) {
    return this.sleepSessionService.getSleepScore(sessionId);
  }
}
