import { Algorithm } from 'jsonwebtoken';
import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  issuer: process.env.JWT_ISSUER,
  audience: process.env.JWT_AUDIENCE,
  accessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
  accessTokenExpirationTime: parseInt(
    process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME,
    10,
  ),
  refreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET,
  refreshTokenExpirationTime: parseInt(
    process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME,
    10,
  ),
  algorithm: <Algorithm>'RS256',
}));
