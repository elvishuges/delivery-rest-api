import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { IsEmailUnique } from './validators/is-email-uique.validator';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [IsEmailUnique, UsersService],
  exports: [IsEmailUnique, UsersService],
})
export class UsersModule {}
