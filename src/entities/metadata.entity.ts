import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('PillowponMetadata')
export class PillowponMetadataEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.metadata)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

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

  @Column({ type: 'double' })
  photoresistor: number;

  @Column({ type: 'double' })
  sound: number;

  @Column({ type: 'datetime' })
  time: Date;
}
