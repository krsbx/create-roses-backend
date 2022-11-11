import path from 'path';
import { fileURLToPath } from 'url';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const __filename = fileURLToPath(import.meta.url); // eslint-disable-line no-underscore-dangle
const distPath = path.dirname(__filename);
export const PKG_ROOT = path.join(distPath, '../');

export const MINIMUM_NODE_VERSION = 14;

export const APP_TITLE = 'CREATE ROSES BACKEND';

export const DEFAULT_APP_NAME = 'my-roses-backend';

export const CREATE_ROSES_BACKEND = 'create-roses-backend';

export const DESCRIPTIONS = `Project created with ${CREATE_ROSES_BACKEND}`;

export const DEFAULT_CLI_OPTIONS: CRB.CliResults = {
  appName: DEFAULT_APP_NAME,
  flags: {
    noInstall: false,
    noGit: false,
    default: false,
    withFile: false,
    withUser: false,
    withTemplate: false,
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
    ASYNC_EXPRESS_MIDDLEWARE: 'express-asyncmw',
    JSONWEBTOKEN: 'jsonwebtoken',
    LODASH: 'lodash',
    MOMENT: 'moment',
    MULTER: 'multer',
  },
  DEV_DEPEDENCIES: {
    BCRYPT: '@types/bcrypt',
    CORS: '@types/cors',
    EXPRESS: '@types/express',
    JSONWEBTOKEN: '@types/jsonwebtoken',
    LODASH: '@types/lodash',
    MULTER: '@types/multer',
    NODE: '@types/node',
    NODEMON: 'nodemon',
    PRISMA: 'prisma',
    PRSIMA_REPO: 'prisma-repo',
    TS_NODE: 'ts-node',
    TYPESCRIPT: 'typescript',
  },
};
