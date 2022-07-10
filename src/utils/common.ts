import { exec } from 'child_process';
import { promisify } from 'util';
import { CREATE_ROSES_BACKEND } from './constants';

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
