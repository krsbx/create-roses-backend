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

export const ENV = `PORT=
SALT=
JWT_SECRET=

# This was inserted by \`prisma init\`:
# Environment variables declared in this file are automatically made available to Prisma.
# See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema

# Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB (Preview) and CockroachDB (Preview).
# See the documentation for all the connection string options: https://pris.ly/d/connection-strings

DATABASE_URL=\${DB_TYPE}://\${DB_USER}:\${DB_PASSWORD}@\${DB_HOST}:\${DB_PORT}/\${DB_NAME}?schema=\${DB_SCHEMA}
DB_USER=
DB_TYPE=
DB_PASSWORD=
DB_HOST=
DB_PORT=
DB_NAME=
DB_SCHEMA=
`;

export const GIT_IGNORE = `node_modules

public/*

!*/**/.gitkeep

# Keep environment variables out of version control
.env
.env.local
.env.production
`;

export const DIRECTORY_STRUCTURE = {
  src: 'src',
  middleware: 'src/middleware',
  repository: 'src/repository',
  routes: 'src/routes',
  utils: 'src/utils',
};

export const FILES_DIRECTORY_STRUCTURE = {
  audios: 'public/audios',
  files: 'public/files',
  images: 'public/images',
  videos: 'public/videos',
};

export const SCRIPTS = {
  RUN_DEV: {
    name: 'dev',
    script: 'nodemon src/index.ts',
  },
  MIGRATE: {
    name: 'migrate',
    script: 'prisma migrate dev',
  },
  CREATE_MIGRATE: {
    name: 'migrate:create',
    script: 'prisma migrate dev --name',
  },
  RESET_MIGRATE: {
    name: 'migrate:reset',
    script: 'prisma migrate reset',
  },
  SEED: {
    name: 'seed',
    script: 'prisma db seed',
  },
} as const;

export const PRSIMA = {
  seed: 'ts-node prisma/seed/index.ts',
};
