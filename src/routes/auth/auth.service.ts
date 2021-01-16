import * as jwt from 'jsonwebtoken';
import * as moment from 'moment';

import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { JwtPayload, JwtToken } from './models';
import { User, UsersService } from '@/routes/users';
import { getRefreshPrivateKey, getRefreshPublicKey } from './helpers';

import JwtConfig from '@/config/jwt.config';

@Injectable()
export class AuthService {
  public async findUser(email: string): Promise<any> {
    return this.usersService.findByEmail(email);
  }

  public async login(user: User): Promise<JwtToken> {
    const {
      accessTokenExpirationTime,
      refreshTokenExpirationTime,
    } = this.config;
    const payload: JwtPayload = { email: user.email, sub: user.id };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = jwt.sign(
      {
        ...payload,
        exp: Math.floor(Date.now() / 1000) + refreshTokenExpirationTime,
      },
      getRefreshPrivateKey(),
      { algorithm: 'RS256' },
    );

    return {
      accessToken,
      refreshToken,
      expiresIn: moment().add(accessTokenExpirationTime, 'seconds').toDate(),
    };
  }

  public async refreshToken(token: string) {
    try {
      const payload: any = jwt.verify(token, getRefreshPublicKey(), {
        algorithms: ['RS256'],
      });
      return this.login({ email: payload.email, id: payload.sub } as any);
    } catch (error) {
      throw new UnauthorizedException({
        requiredLogin: true,
        message: 'Refresh token expirou. Faça o login novamente.',
      });
    }
  }

  constructor(
    @Inject(JwtConfig.KEY)
    private readonly config: ConfigType<typeof JwtConfig>,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}
}
