import {config as dotenvConfig} from 'dotenv';
dotenvConfig();

import * as config from 'config';

export function getPort(): number{
  return config.get('server.port');
}

export function getHost(): string {
  return `${config.get('server.host')}`;
}

export function getConfig() {
  return config;
}