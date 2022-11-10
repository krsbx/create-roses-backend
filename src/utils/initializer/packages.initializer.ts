import chalk from 'chalk';
import ora from 'ora';
import { execAsync } from 'utils/promises';
import { PACKAGES } from 'utils/constants';

export const initializePackages = async (projectDir: string) => {
  const dependencies = Object.values(PACKAGES.DEPEDENCIES);
  const devDependencies = Object.values(PACKAGES.DEV_DEPEDENCIES);

  const spinner = ora('Adding dependencies...\n').start();

  try {
    // Add dependencies
    await execAsync(`npx add-dependencies ${dependencies.join(' ')}`, {
      cwd: projectDir,
    });

    // Add dev dependencies
    await execAsync(`npx add-dependencies -D ${devDependencies.join(' ')}`, {
      cwd: projectDir,
    });

    spinner.succeed(chalk.green.bold('Dependencies added successfully'));
  } catch {
    spinner.fail(chalk.red.bold('An error has occured while adding dependencies'));
  }
};

export const installPackages = async (
  projectDir: string,
  packageManager: string,
  flags: CRB.CliFlags
) => {
  if (flags.noInstall) return;

  const spinner = ora(`Installing dependencies with ${packageManager}...`).start();

  try {
    await execAsync(`${packageManager} install`, {
      cwd: projectDir,
    });

    spinner.succeed(chalk.green.bold('Dependencies installed successfully!'));
  } catch {
    spinner.fail(chalk.red.bold('Failed to install dependencies'));
  }
};
