import ora from 'ora';
import chalk from 'chalk';
import fs from 'fs-extra';
import { DESCRIPTIONS } from 'utils/constants';

export const modifyPackageJson = async (projectDir: string, appName: string) => {
  const packageJson = await fs.readJSON(`${projectDir}/package.json`);

  packageJson.name = appName;
  packageJson.description = DESCRIPTIONS;

  const spinner = ora(`Updating package.json...\n`).start();

  try {
    await fs.writeJSON(`${projectDir}/package.json`, packageJson, {
      spaces: 2,
    });
    spinner.succeed(chalk.green.bold('Package.json updated successfully!'));
  } catch {
    spinner.fail(chalk.red.bold('Failed to update package.json'));
  }
};
