import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { SleepSessionEntity } from './sleep-session.entity';

@Entity('Metadata')
export class MetadataEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => SleepSessionEntity,
    (sleep_session) => sleep_session.metadata,
  )
  @JoinColumn({ name: 'sleep_session_id' })
  sleep_session: SleepSessionEntity;

  @Column({ type: 'double' })
  pressure: number;

  @Column({ type: 'double' })
  accelerator: number;

  @Column({ type: 'double' })
  humidity: number;

  @Column({ type: 'double' })
  temperature: number;

  @Column({ type: 'double' })
  body_detection: number;

  @ApiProperty({
    example: '0.0',
    required: false,
  })
  @Column({ type: 'double' })
  photoresistor: number;

  @Column({ type: 'double' })
  sound: number;

  @Column({ type: 'datetime' })
  time: Date;
}
