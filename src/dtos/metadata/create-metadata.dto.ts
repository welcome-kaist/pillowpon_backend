import { ApiProperty } from '@nestjs/swagger';

export class CreateMetadataDTO {
  @ApiProperty({ example: 0.42, description: '압력 값' })
  pressure: number;

  @ApiProperty({ example: 0.12, description: '가속도 값' })
  accelerator: number;

  @ApiProperty({ example: 45, description: '습도 값 (%)' })
  humidity: number;

  @ApiProperty({ example: 36.5, description: '온도 값 (°C)' })
  temperature: number;

  @ApiProperty({ example: 1, description: '신체 감지 여부 (0 또는 1)' })
  body_detection: number;

  @ApiProperty({ example: 0.2, description: '조도 센서 값' })
  photoresistor: number;

  @ApiProperty({ example: 25, description: '소리 센서 값 (dB)' })
  sound: number;

  @ApiProperty({
    example: '2025-05-21T02:30:00.000Z',
    description: '데이터 수집 시각',
  })
  time: Date;
}
