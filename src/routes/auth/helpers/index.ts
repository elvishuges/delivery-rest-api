import { readFileSync } from 'fs'

export const getPrivateKey = () => readFileSync('private/keys/jwt.pem', 'utf8');
export const getPublicKey = () => readFileSync('private/keys/jwt.pub.pem', 'utf8');
export const getRefreshPrivateKey = () => readFileSync('private/keys/jwt-refresh.pem', 'utf8');
export const getRefreshPublicKey = () => readFileSync('private/keys/jwt-refresh.pub.pem', 'utf8');
