import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SleepSessionController } from './sleep-session.controller';
import { SleepSessionService } from './sleep-session.service';
import { UserEntity } from 'src/entities/user.entity';
import { SleepSessionEntity } from 'src/entities/sleep-session.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SleepSessionEntity, UserEntity])],
  controllers: [SleepSessionController],
  providers: [SleepSessionService],
})
export class SleepSessionModule {}
