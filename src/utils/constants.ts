import { CliResults } from './interfaces';

export const MINIMUM_NODE_VERSION = 14;

export const APP_TITLE = 'CREATE ROSES BACKEND';

export const DEFAULT_APP_NAME = 'my-roses-backend';

export const CREATE_ROSES_BACKEND = 'create-roses-backend';

export const DEFAULT_CLI_OPTIONS: CliResults = {
  appName: DEFAULT_APP_NAME,
  flags: {
    noInstall: false,
    noGit: false,
    default: false,
  },
};

export const COLOR_SCHEME = {
  BRIGHT_RED: '#E2180A',
  BRIGHT_ORANGE: '#F34B8C',
  BRIGHT_PURPLE: '#C8184F',
  BRIGHT_GREEN: '#52A849',
  DARK_GREEN: '19511E',
};

export const PACKAGES = {
  DEPEDENCIES: {
    PRISMA_FQP: '@krsbx/prisma-fqp',
    PRISMA_CLIENT: '@prisma/client',
    BCRYPT: 'bcrypt',
    CORS: 'cors',
    DOTENV: 'dotenv',
    DOTENV_EXPAND: 'dotenv-expand',
    EXPRESS: 'express',
    ASYNC_EXPRESS_MIDDLEWARE: 'fork-async-express-mw',
    JSONWEBTOKEN: 'jsonwebtoken',
    LODASH: 'lodash',
    MOMENT: 'moment',
  },
  DEV_DEPEDENCIES: {
    BCRYPT: '@types/bcrypt',
    EXPRESS: '@types/express',
    JSONWEBTOKEN: '@types/jsonwebtoken',
    LODASH: '@types/lodash',
    NODE: '@types/node',
    NODEMON: 'nodemon',
    PRISMA: 'prisma',
    TS_NODE: 'ts-node',
    TYPESCRIPT: 'typescript',
  },
};
