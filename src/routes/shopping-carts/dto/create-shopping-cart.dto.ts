import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumberString,
  IsBoolean
} from 'class-validator';


export class CreateShoppingCartDto {
  @ApiProperty()
  @IsNumberString()
  @IsNotEmpty()
  readonly price: number;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  readonly paiedOut: boolean;
}
