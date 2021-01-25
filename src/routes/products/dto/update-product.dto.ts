import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';

// Ref: https://trilon.io/blog/introducing-mapped-types-for-nestjs
export class UpdateProductDto extends PartialType(
    CreateProductDto,
) { }
