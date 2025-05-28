import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'test@kaist.ac.kr', required: true })
  email: string;

  @ApiProperty({ example: '1234', required: true })
  password: string;
}
