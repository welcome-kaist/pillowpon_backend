import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'test', required: true })
  user_id: string;

  @ApiProperty({ example: '1234', required: true })
  password: string;
}
