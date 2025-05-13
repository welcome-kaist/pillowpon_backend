import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { MetadataEntity } from './metadata.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('User')
export class UserEntity {
  @ApiProperty({
    example: 'test',
    required: true,
  })
  @PrimaryColumn({ type: 'varchar', length: 50 })
  user_id: string;

  @ApiProperty({
    example: '1234',
    required: true,
  })
  @Column({ type: 'varchar' })
  password: string;

  @ApiProperty({
    example: 'test@kaist.ac.kr',
    required: true,
  })
  @Column({ type: 'varchar', length: 50, unique: true })
  email: string;

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

  @OneToMany(() => MetadataEntity, (metadata) => metadata.user, {
    cascade: true,
  })
  metadata: MetadataEntity[];
}
