export interface JwtToken {
  accessToken: string;
  refreshToken: string;
  expiresIn: Date;
}
