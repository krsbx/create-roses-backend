import ora from 'ora';
import chalk from 'chalk';
import fs from 'fs-extra';
import { getOverwritePermissions } from 'utils/cli/prompt/overwrite.prompt';
import { execAsync } from 'utils/promises';
import logger from 'utils/logger';

const overwriteDirConfirmation = async (appName: string, projectDir: string) => {
  const overwriteDir = await getOverwritePermissions(appName);

  if (!overwriteDir) {
    logger.info('Exiting...');
    process.exit(0);
  }

  const spinner = ora(`Emptying ${appName} and creating with CRB...\n`).start();

  try {
    await fs.emptyDir(projectDir);
    spinner.succeed();
  } catch {
    spinner.fail(chalk.red.bold('An error has occured'));
    spinner.fail(chalk.red.bold('Exiting...'));
    process.exit(1);
  }
};

export const initializeDirectory = async (appName: string, projectDir: string) => {
  if (fs.existsSync(projectDir)) {
    if (fs.readdirSync(projectDir).length === 0) {
      logger.info(`${appName} exists but is empty, continuing...\n`);
    } else {
      await overwriteDirConfirmation(appName, projectDir);
    }
  } else {
    await fs.mkdirp(projectDir);
  }

  await execAsync('npm init -y', { cwd: projectDir });
};
