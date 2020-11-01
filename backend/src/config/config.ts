import * as dotenv from 'dotenv';

dotenv.config();

let path;

switch (process.env.NODE_ENV) {
  case 'test':
    path = `${__dirname}/../../.env.test`;
    break;

  case 'production':
    path = `${__dirname}/../../../.env.production`;
    break;

  default:
    path = `${__dirname}/../../../.env.development`;
}

dotenv.config({ path });

export const DEBUG = process.env.DEBUG;
export const SERVER_HOST = process.env.SERVER_HOST;
export const SERVER_PORT = process.env.SERVER_PORT;
export const MONGO_URL = process.env.MONGO_URL;
export const DB_NAME = process.env.DB_NAME;
