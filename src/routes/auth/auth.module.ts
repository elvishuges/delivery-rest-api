import { Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtModule, JwtSecretRequestType } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

import { UsersModule } from '../users';

import { getPublicKey, getPrivateKey } from './helpers';

import JwtConfig from '@/config/jwt.config';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: async (config: ConfigType<typeof JwtConfig>) => ({
        secretOrKeyProvider: (requestType: JwtSecretRequestType) => {
          switch (requestType) {
            case JwtSecretRequestType.SIGN:
              return getPrivateKey();
            case JwtSecretRequestType.VERIFY:
              return getPublicKey();
            default:
              return config.accessTokenSecret;
          }
        },
        signOptions: {
          expiresIn: config.accessTokenExpirationTime,
          audience: config.audience,
          issuer: config.issuer,
          algorithm: config.algorithm,
        },
      }),
      inject: [JwtConfig.KEY],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
