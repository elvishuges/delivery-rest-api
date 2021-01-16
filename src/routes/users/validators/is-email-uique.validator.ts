import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { Injectable } from '@nestjs/common';

import { UsersService } from '../users.service';

/**
 * Custom validation constraint for email uniqueness
 */
@ValidatorConstraint({ name: 'isEmailUnique', async: true })
@Injectable()
export class IsEmailUnique implements ValidatorConstraintInterface {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Check email address for uniqueness against existing user entities
   */
  public async validate(email: string): Promise<boolean> {
    const userExists = await this.usersService.findByEmail(email);

    return userExists === undefined;
  }

  /**
   * Default error message
   */
  public defaultMessage(args: ValidationArguments): string {
    return 'User with this email already exists.';
  }
}
