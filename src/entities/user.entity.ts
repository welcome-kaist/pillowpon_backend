import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { PillowponMetadataEntity } from './metadata.entity';

@Entity('User')
export class UserEntity {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  user_id: string;

  @Column({ type: 'varchar' })
  password: string;

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
