import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from './user.entity';
import { MetadataEntity } from './metadata.entity';

@Entity('sleep_sessions')
export class SleepSessionEntity {
  @ApiProperty({ example: 1, description: '수면 세션의 고유 ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'test',
    description: '수면 세션을 소유한 사용자 ID',
  })
  @ManyToOne(() => UserEntity, (user) => user.sleep_sessions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ApiProperty({ example: 85, description: '수면 점수 (0~100)' })
  @Column({ type: 'int' })
  sleep_score: number;

  @ApiProperty({
    example: 'ongoing',
    description: '수면 상태 (ongoing 또는 completed)',
    enum: ['ongoing', 'completed'],
  })
  @Column({ type: 'enum', enum: ['ongoing', 'completed'], default: 'ongoing' })
  sleep_status: 'ongoing' | 'completed';

  @ApiProperty({
    example: '2025-05-20T23:30:00.000Z',
    description: '수면 시작 시간',
  })
  @Column({ type: 'datetime' })
  start_time: Date;

  @ApiProperty({
    example: '2025-05-21T07:00:00.000Z',
    description: '수면 종료 시간',
  })
  @Column({ type: 'datetime', nullable: true })
  end_time: Date;

  @OneToMany(() => MetadataEntity, (metadata) => metadata.sleep_session, {
    cascade: true,
  })
  metadata: MetadataEntity[];
}
