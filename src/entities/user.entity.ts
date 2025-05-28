import {
  Entity,
  PrimaryColumn,
  Column,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MetadataEntity } from './metadata.entity';
import { ApiProperty } from '@nestjs/swagger';
import { SleepSessionEntity } from './sleep-session.entity';

@Entity('User')
export class UserEntity {
  @ApiProperty({ example: 'uuid-string', required: true })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'test@kaist.ac.kr', required: true })
  @Column({ type: 'varchar', length: 50, unique: true })
  email: string;

  @ApiProperty({
    example: '1234',
    required: true,
  })
  @Column({ type: 'varchar' })
  password: string;

  @ApiProperty({
    example: 'Bart Simpson',
    required: true,
  })
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @ApiProperty({
    example: '10',
    required: true,
  })
  @Column({ type: 'int', nullable: true })
  age: number;

  @ApiProperty({
    example: 'male',
    required: true,
  })
  @Column({ type: 'varchar', length: 10, nullable: true })
  gender: string;

  @OneToMany(() => SleepSessionEntity, (sleep_session) => sleep_session.user, {
    cascade: true,
  })
  sleep_sessions: SleepSessionEntity[];
}
