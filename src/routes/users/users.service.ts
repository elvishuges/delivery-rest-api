import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CrudService } from '@/core';

import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService extends CrudService<User> {
  async findByEmail(email: string) {
    return await this.userRepository.findOne({ email });
  }

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {
    super(userRepository);
  }
}
