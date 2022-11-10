import chalk from 'chalk';
import ora from 'ora';
import { execAsync, seqPromise } from 'utils/promises';
import { PACKAGES } from 'utils/constants';

export const initializePackages = async (
  projectDir: string,
  packageManager: string,
  flags: CRB.CliFlags
) => {
  const dependencies = Object.values(PACKAGES.DEPEDENCIES);
  const devDependencies = Object.values(PACKAGES.DEV_DEPEDENCIES);

  const spinner1 = ora('Adding dependencies...\n').start();

  try {
    await seqPromise([
      // Add dependencies
      execAsync(`npx add-dependencies ${dependencies.join(' ')}`, {
        cwd: projectDir,
      }),

      // Add dev dependencies
      execAsync(`npx add-dependencies -D ${devDependencies.join(' ')}`, {
        cwd: projectDir,
      }),
    ]);

    spinner1.succeed(chalk.green.bold('Dependencies added successfully'));
  } catch {
    spinner1.fail(chalk.red.bold('An error has occured while adding dependencies'));
  }

  if (flags.noInstall) return;

  const spinner2 = ora(`Installing dependencies with ${packageManager}...`).start();

  try {
    await execAsync(`${packageManager} install`, {
      cwd: projectDir,
    });

    spinner2.succeed(chalk.green.bold('Dependencies installed successfully!'));
  } catch {
    spinner2.fail(chalk.red.bold('Failed to install dependencies'));
  }
};
