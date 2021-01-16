import { ExtractJwt, Strategy } from 'passport-jwt';

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { JwtPayload } from '../models';

import { AuthService } from '../auth.service';
import { getPublicKey } from '../helpers';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  public async validate({ email }: JwtPayload): Promise<any> {
    return await this.authService.findUser(email);
  }

  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: getPublicKey(),
    });
  }
}
