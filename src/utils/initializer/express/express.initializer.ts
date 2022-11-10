import ora from 'ora';
import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import { PKG_ROOT } from 'utils/constants';
import { seqPromise } from 'utils/promises';
import {
  cleanUpMiddleware,
  cleanUpRepository,
  cleanUpRoutes,
  cleanUpUtils,
} from './helper.express';

export const initializeExpress = async (projectDir: string, flags: CRB.CliFlags) => {
  const rootDir = path.join(PKG_ROOT, 'templates');
  const srcDir = path.join(PKG_ROOT, 'templates/src');
  const srcDist = path.join(projectDir, 'src');

  const spinner = ora(`Initializing express...`).start();

  try {
    // Create all the files for the express template
    await seqPromise([
      fs.mkdir(srcDist),
      fs.copy(srcDir, srcDist),
      fs.copy(path.join(rootDir, '_env'), path.join(projectDir, '.env')),
      fs.copy(path.join(rootDir, '_env'), path.join(projectDir, '.env.example')),
      fs.copy(
        path.join(rootDir, 'repository.setting.ts'),
        path.join(projectDir, 'repository.setting.ts')
      ),
    ]);

    if (!flags.noGit)
      await fs.copy(path.join(rootDir, '_gitignore'), path.join(projectDir, '.gitignore'));

    // Remove any unnecessary files
    await seqPromise([
      cleanUpMiddleware(projectDir, flags),
      cleanUpUtils(projectDir, flags),
      cleanUpRepository(projectDir, flags),
      cleanUpRoutes(projectDir, flags),
    ]);

    spinner.succeed(chalk.green.bold('Express initialized.'));
  } catch {
    spinner.fail(chalk.red.bold('Failed to initialize express.'));
  }
};
