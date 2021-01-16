import { compare } from 'bcryptjs';
import { Strategy } from 'passport-local';

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  public async validate(email: string, pass: string): Promise<any> {
    const { id, password, ...user } =
      (await this.authService.findUser(email)) || {};
    switch (true) {
      case !Object.keys(user).length:
        throw new UnauthorizedException(
          'Não encontramos o usuário, por favor verifique o email informado.',
        );
      case !(await compare(pass, password)):
        throw new UnauthorizedException(
          'Você digitou uma senha incorreta, por favor verifique.',
        );
      case !user.isActive:
        throw new UnauthorizedException(
          'Seu acesso está temporariamente suspenso, fale com seu administrador para mais detalhes.',
        );
      default:
        return Object.assign({ id }, user);
    }
  }

  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }
}
