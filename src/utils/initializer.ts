import chalk from 'chalk';
import fs from 'fs-extra';
import inquirer from 'inquirer';
import ora from 'ora';
import { execAsync } from './common';
import { PACKAGES, GIT_IGNORE, SCRIPTS } from './constants';
import { CliFlags } from './interfaces';
import logger from './logger';

export const initializeDirectory = async (appName: string, projectDir: string) => {
  if (fs.existsSync(projectDir)) {
    if (fs.readdirSync(projectDir).length === 0) {
      logger.info(`${appName} exists but is empty, continuing...\n`);
    } else {
      const { overwriteDir } = await inquirer.prompt<{ overwriteDir: boolean }>({
        name: 'overwriteDir',
        type: 'confirm',
        message: `${chalk.redBright.bold('Warning:')} ${chalk.cyan.bold(
          appName
        )} already exists and isn't empty. Do you want to overwrite it?`,
        default: false,
      });

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
    }
  } else {
    await fs.mkdirp(projectDir);
  }

  await execAsync('npm init -y', { cwd: projectDir });
};

export const addPackages = async (projectDir: string, packageManager: string, flags: CliFlags) => {
  const dependencies = Object.values(PACKAGES.DEPEDENCIES);
  const devDependencies = Object.values(PACKAGES.DEV_DEPEDENCIES);

  // Add dependencies
  await execAsync(`npx add-dependencies ${dependencies.join(' ')}`, {
    cwd: projectDir,
  });

  // Add dev dependencies
  await execAsync(`npx add-dependencies -D ${devDependencies.join(' ')}`, {
    cwd: projectDir,
  });

  if (flags.noInstall) return;

  const spinner = ora(`Installing dependencies with ${packageManager}...`).start();

  try {
    await execAsync(`${packageManager} install`, {
      cwd: projectDir,
    });

    spinner.succeed(chalk.green('Dependencies installed successfully!'));
  } catch {
    spinner.fail(chalk.red('Failed to install dependencies'));
  }
};

export const initializeGit = async (projectDir: string) => {
  const spinner = ora('Initializing git...\n\n').start();

  let initCmd = 'git init --initial-branch=main';

  try {
    // --initial-branch flag was added in git v2.28.0
    // ref: https://github.com/t3-oss/create-t3-app/blob/main/src/helpers/initGit.ts
    const { stdout: gitVersionOutput } = await execAsync('git --version'); // git version 2.32.0 ...
    const gitVersionTag = gitVersionOutput.split(' ')[2];

    const major = gitVersionTag?.split('.')[0];
    const minor = gitVersionTag?.split('.')[1];

    if (Number(major) < 2 || Number(minor) < 28) {
      initCmd = 'git init && git branch -m main';
    }

    await execAsync(initCmd, { cwd: projectDir });
    spinner.succeed(chalk.green.bold('Git initialized.'));

    // Create .gitignore file
    await fs.writeFile(`${projectDir}/.gitignore`, GIT_IGNORE);
  } catch {
    spinner.fail(chalk.red.bold('Failed to initialize Git. Please update git to continue.'));
  }
};

export const addScripts = async (projectDir: string) => {
  const spinner = ora('Adding scripts...\n\n').start();

  try {
    await Promise.all(
      Object.values(SCRIPTS).map(({ name, script }) =>
        execAsync(`npm set-script ${name} "${script}"`, { cwd: projectDir })
      )
    );
    spinner.succeed(chalk.green.bold('Scripts added successfully.'));
  } catch {
    spinner.fail(
      chalk.red.bold(`Failed to add scripts. Please run this manually in ${projectDir}.`)
    );
    spinner.fail(
      chalk.red.bold(`
  ${Object.values(SCRIPTS)
    .map(({ name, script }) => `npm set-script ${name} "${script}"`)
    .join('\n  ')}
`)
    );
  }
};
