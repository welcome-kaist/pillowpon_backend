import { PickType } from '@nestjs/swagger';
import { UserEntity } from 'src/entities/user.entity';

export class RegisterDTO extends PickType(UserEntity, [
  'password',
  'email',
  'name',
  'age',
  'gender',
]) {}
