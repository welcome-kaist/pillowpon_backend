import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('Metadata')
export class MetadataEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.metadata)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ApiProperty({
    example: '0.0',
    required: false,
  })
  @Column({ type: 'double' })
  pressure: number;

  @ApiProperty({
    example: '0.0',
    required: false,
  })
  @Column({ type: 'double' })
  accelerator: number;

  @ApiProperty({
    example: '0.0',
    required: false,
  })
  @Column({ type: 'double' })
  humidity: number;

  @ApiProperty({
    example: '0.0',
    required: false,
  })
  @Column({ type: 'double' })
  temperature: number;

  @ApiProperty({
    example: '0.0',
    required: false,
  })
  @Column({ type: 'double' })
  body_detection: number;

  @ApiProperty({
    example: '0.0',
    required: false,
  })
  @Column({ type: 'double' })
  photoresistor: number;

  @ApiProperty({
    example: '0.0',
    required: false,
  })
  @Column({ type: 'double' })
  sound: number;

  @ApiProperty({
    example: '2025-05-13T23:45:00.000Z',
    required: false,
  })
  @Column({ type: 'datetime' })
  time: Date;
}
