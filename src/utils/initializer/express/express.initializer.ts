import ora from 'ora';
import chalk from 'chalk';
import fs from 'fs-extra';
import path from 'path';
import { PKG_ROOT } from 'utils/constants';
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
    await fs.mkdir(srcDist);
    await fs.copy(srcDir, srcDist);
    await fs.copy(path.join(rootDir, '_env'), path.join(projectDir, '.env'));
    await fs.copy(path.join(rootDir, '_env'), path.join(projectDir, '.env.example'));
    await fs.copy(
      path.join(rootDir, 'repository.setting.ts'),
      path.join(projectDir, 'repository.setting.ts')
    );

    if (!flags.noGit)
      await fs.copy(path.join(rootDir, '_gitignore'), path.join(projectDir, '.gitignore'));

    // Remove any unnecessary files
    await cleanUpMiddleware(projectDir, flags);
    await cleanUpUtils(projectDir, flags);
    await cleanUpRepository(projectDir, flags);
    await cleanUpRoutes(projectDir, flags);

    spinner.succeed(chalk.green.bold('Express initialized.'));
  } catch {
    spinner.fail(chalk.red.bold('Failed to initialize express.'));
  }
};
