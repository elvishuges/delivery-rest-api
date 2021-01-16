import { Body, Controller, Get, Post, UseGuards, Query } from '@nestjs/common';

import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';

import { CreateUserDto, User, UsersService } from '../users';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Get('refresh')
  async refreshToken(@Query('token') token: string) {
    return this.authService.refreshToken(token);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user')
  getUser(@CurrentUser() user: User): User {
    return user;
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@CurrentUser() user: User): Promise<any> {
    return this.authService.login(user);
  }

  @Post('register')
  async register(@Body() dto: CreateUserDto): Promise<User> {
    return this.usersService.create(dto);
  }
}
