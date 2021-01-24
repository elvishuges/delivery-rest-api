import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateShoppingCartDto } from './create-shopping-cart.dto';

// Ref: https://trilon.io/blog/introducing-mapped-types-for-nestjs
export class UpdateShoppingCartDto extends PartialType(
  CreateShoppingCartDto,
) { }
