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
  const packageJson = JSON.parse(await fs.readFile(`${projectDir}/package.json`, 'utf8'));

  packageJson.name = appName;
  packageJson.description = DESCRIPTIONS;
  packageJson.prisma = PRSIMA;

  await fs.writeFile(`${projectDir}/package.json`, JSON.stringify(packageJson, null, 2));
};

export const removeGitIgnore = async (projectDir: string) => {
  // Remove .gitignore since prisma will create it
  await fs.remove(`${projectDir}/.gitignore`);
};
