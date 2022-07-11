import ora from 'ora';
import chalk from 'chalk';
import fs from 'fs-extra';
import { promisify } from 'util';
import { exec } from 'child_process';
import { CREATE_ROSES_BACKEND, DESCRIPTIONS, PRSIMA } from './constants';

export const getPackageManager = () => {
  const userAgent = process.env.npm_config_package_manager;

  if (!userAgent) return 'npm';

  if (userAgent.startsWith('yarn')) return 'yarn';
  if (userAgent.startsWith('pnpm')) return 'pnpm';

  return 'npm';
};

export const execAsync = promisify(exec);

export const commitChanges = async (projectDir: string) => {
  await execAsync('git add .', { cwd: projectDir });
  await execAsync(`git commit -m "chore: init with ${CREATE_ROSES_BACKEND}"`, { cwd: projectDir });
};

export const modifyPackageJson = async (projectDir: string, appName: string) => {
  const packageJson = await fs.readJSON(`${projectDir}/package.json`);

  packageJson.name = appName;
  packageJson.description = DESCRIPTIONS;
  packageJson.prisma = PRSIMA;

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

export const removeGitIgnore = async (projectDir: string) => {
  // Remove .gitignore since prisma will create it
  await fs.remove(`${projectDir}/.gitignore`);
};

// ref: https://github.com/t3-oss/create-t3-app/blob/main/src/utils/parseNameAndPath.ts
export const parseNameAndPath = (input: string) => {
  const paths = input.split('/');

  let appName = paths[paths.length - 1];

  // If the first part is a @, it's a scoped package
  const indexOfDelimiter = paths.findIndex((p) => p.startsWith('@'));
  if (paths.findIndex((p) => p.startsWith('@')) !== -1) {
    appName = paths.slice(indexOfDelimiter).join('/');
  }

  const path = paths.filter((p) => !p.startsWith('@')).join('/');

  return [appName, path] as const;
};
