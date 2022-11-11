import ora from 'ora';
import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import { PKG_ROOT } from 'utils/constants';
import { cleanUpSchema, cleanUpSeed } from './helper.prisma';

export const initializePrisma = async (projectDir: string, flags: CRB.CliFlags) => {
  const prismaDir = path.join(PKG_ROOT, 'template/prisma');
  const prismaDist = path.join(projectDir, 'prisma');

  const spinner = ora('Initializing prisma...').start();

  try {
    // Create all the files for the prisma template
    await fs.mkdir(prismaDist);
    await fs.copy(prismaDir, prismaDist);

    // Remove any unnecessary files
    await cleanUpSchema(projectDir, flags);
    await cleanUpSeed(projectDir, flags);

    spinner.succeed(chalk.green.bold('Prisma initialized.'));
  } catch (e) {
    console.log(e);
    spinner.fail(chalk.red.bold('Prisma initialization failed.'));
  }
};
