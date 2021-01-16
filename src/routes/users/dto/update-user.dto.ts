import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

// Ref: https://trilon.io/blog/introducing-mapped-types-for-nestjs
export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['email']),
) {}
