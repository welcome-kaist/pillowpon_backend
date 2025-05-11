import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { PillowponMetadataEntity } from './metadata.entity';

@Entity('User')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, unique: true })
  user_id: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'int', nullable: true })
  age: number;

  @Column({ type: 'varchar', length: 10, nullable: true })
  gender: string;

  @OneToMany(() => PillowponMetadataEntity, (metadata) => metadata.user, {
    cascade: true,
  })
  metadata: PillowponMetadataEntity[];
}
