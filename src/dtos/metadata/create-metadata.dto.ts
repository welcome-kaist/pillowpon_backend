import { ApiProperty } from '@nestjs/swagger';

export class CreateMetadataDTO {
  @ApiProperty({
    example: 0.5,
    description: '압력 센서 값 (hPa 또는 bar 단위)',
  })
  pressure: number;

  @ApiProperty({
    example: 11.3,
    description: '가속도 센서 값 (움직임 횟수, 평균 11)',
  })
  accelerator: number;

  @ApiProperty({
    example: 45,
    description: '습도 값 (%)',
  })
  humidity: number;

  @ApiProperty({
    example: 25.2,
    description: '온도 값 (°C, 평균 25)',
  })
  temperature: number;

  @ApiProperty({
    example: 7.1,
    description: '신체 감지 값 (평균 7)',
  })
  body_detection: number;

  @ApiProperty({
    example: 0.3,
    description: '조도 센서 값 (0~1, 0: 어두움, 1: 밝음)',
  })
  photoresistor: number;

  @ApiProperty({
    example: 28,
    description: '소리 감지 값 (dB)',
  })
  sound: number;

  @ApiProperty({
    example: '2025-05-21T02:30:00.000Z',
    description: '데이터 수집 시각 (ISO 8601 형식)',
  })
  time: Date;
}
