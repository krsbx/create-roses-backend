import ora from 'ora';
import chalk from 'chalk';
import fs from 'fs-extra';
import { ENV } from 'utils/constants';
import { execAsync, seqPromise } from 'utils/promises';
import * as seeds from './prisma/seed';
import * as schema from './prisma/schema';
import { prismaInstance } from './prisma/seed/instance';
import { userSeeder } from './prisma/seed/user';

const createPrismaSeeds = async (projectDir: string, flags: CRB.CliFlags) => {
  const spinner = ora('Creating prisma seeds...\n').start();

  let seed = '';

  seed += `${seeds.imports.instance}\n`;
  if (flags.withUser) seed += `${seeds.imports.user}\n\n`;

  seed += `${seeds.seeder.start}\n`;
  if (flags.withUser) seed += `  ${seeds.seeder.user}\n`;
  seed += `${seeds.seeder.end}\n`;

  try {
    await seqPromise([
      fs.writeFile(`${projectDir}/prisma/seed/index.ts`, seed),
      fs.writeFile(`${projectDir}/prisma/seed/user.ts`, userSeeder),
    ]);

    spinner.succeed(chalk.green.bold('Prisma seeds created.'));
  } catch {
    spinner.fail(chalk.red.bold('Prisma seeds creation failed.'));
  }
};

const createPrismaSeedInstance = async (projectDir: string) => {
  const spinner = ora('Creating prisma seed instance...\n').start();

  try {
    await fs.writeFile(`${projectDir}/prisma/seed/instance.ts`, prismaInstance);

    spinner.succeed(chalk.green.bold('Prisma seed instance created.'));
  } catch {
    spinner.fail(chalk.red.bold('Prisma seed instance creation failed.'));
  }
};

const createPrismaSchema = async (projectDir: string, flags: CRB.CliFlags) => {
  if (!flags.withUser && !flags.withFile) return;

  let schemaFile = await fs.readFile(`${projectDir}/prisma/schema.prisma`, 'utf8');

  if (flags.withUser) {
    schemaFile += `\n\n${schema.user.role}\n`;
    schemaFile += `\n\n${schema.user.model}\n`;
  }

  if (flags.withFile) {
    schemaFile += `\n\n${schema.file.model}\n`;
  }

  const spinner = ora('Creating prisma schema from selected template...\n').start();
  try {
    await fs.writeFile(`${projectDir}/prisma/schema.prisma`, schemaFile);

    spinner.succeed(chalk.green.bold('Prisma schema created.'));
  } catch {
    spinner.fail(chalk.red.bold('Prisma schema creation failed.'));
  }
};

const initializePrisma = async (projectDir: string, flags: CRB.CliFlags) => {
  const spinner = ora('Initializing prisma...').start();

  try {
    await execAsync(`npx prisma init`, { cwd: projectDir });

    await fs.mkdirp(`${projectDir}/prisma/seed`);

    await seqPromise([
      createPrismaSchema(projectDir, flags),
      createPrismaSeedInstance(projectDir),
      flags.withUser ? createPrismaSeeds(projectDir, flags) : Promise.resolve(),

      // Create .env file
      fs.writeFile(`${projectDir}/.env`, ENV),
      fs.writeFile(`${projectDir}/.env.example`, ENV),
    ]);

    spinner.succeed(chalk.green.bold('Prisma initialized.'));
  } catch {
    spinner.fail(chalk.red.bold('Prisma initialization failed.'));
  }
};

export default initializePrisma;
