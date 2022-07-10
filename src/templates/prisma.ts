import fs from 'fs-extra';
import { execAsync } from '../utils/common';
import * as seeds from './prisma/seed/index';
import * as schema from './prisma/schema';
import { prismaInstance } from './prisma/seed/instance';
import { CliFlags } from '../utils/interfaces';
import { ENV } from '../utils/constants';

const createPrismaSeeds = async (projectDir: string, flags: CliFlags) => {
  console.log('Creating prisma seeds...');

  let seed = '';

  seed += `${seeds.imports.instance}\n`;
  if (flags.withUser) seed += `${seeds.imports.user}\n\n`;

  seed += `${seeds.seeder.start}\n`;
  if (flags.withUser) seed += `  ${seeds.seeder.user}\n`;
  seed += `${seeds.seeder.end}\n`;

  await fs.writeFile(`${projectDir}/prisma/seed/index.ts`, seed);

  console.log('Prisma seeds created.');
};

const createPrismaSeedInstance = async (projectDir: string) => {
  console.log('Creating prisma seed instance...');

  await fs.writeFile(`${projectDir}/prisma/seed/instance.ts`, prismaInstance);

  console.log('Prisma seed instance created.');
};

const createPrismaSchema = async (projectDir: string, flags: CliFlags) => {
  let schemaFile = await fs.readFile(`${projectDir}/prisma/schema.prisma`, 'utf8');

  if (flags.withUser) {
    console.log('Adding prisma user schema...');

    schemaFile += `\n\n${schema.user.role}\n`;
    schemaFile += `\n\n${schema.user.model}\n`;

    console.log('Prisma schema user added.');
  }

  if (flags.withFile) {
    console.log('Adding prisma file schema...');

    schemaFile += `\n\n${schema.file.model}\n`;

    console.log('Prisma schema file added.');
  }

  await fs.writeFile(`${projectDir}/prisma/schema.prisma`, schemaFile);
};

const initializePrisma = async (projectDir: string, flags: CliFlags) => {
  console.log('Initializing Prisma...');

  await execAsync(`npx prisma init`, { cwd: projectDir });

  await fs.mkdirp(`${projectDir}/prisma/seed`);

  await Promise.all([
    createPrismaSchema(projectDir, flags),
    createPrismaSeedInstance(projectDir),
    createPrismaSeeds(projectDir, flags),

    // Create .env file
    fs.writeFile(`${projectDir}/.env`, ENV),
    fs.writeFile(`${projectDir}/.env.example`, ENV),
  ]);

  console.log('Prisma initialized.');

  console.log('Run `npm run migrate -- [name]` to create the database migrations.');
  console.log('Run `npm run seed` to seed the database.');
};

export default initializePrisma;
