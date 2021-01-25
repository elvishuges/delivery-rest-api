import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateCategoryDto } from './create-category.dto';

// Ref: https://trilon.io/blog/introducing-mapped-types-for-nestjs
export class UpdateCategoryDto extends PartialType(
    CreateCategoryDto,
) { }
