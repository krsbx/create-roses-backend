import { exec } from 'child_process';
import { promisify } from 'util';

export const getPackageManager = () => {
  const userAgent = process.env.npm_config_package_manager;

  if (!userAgent) return 'npm';

  if (userAgent.startsWith('yarn')) return 'yarn';
  if (userAgent.startsWith('pnpm')) return 'pnpm';

  return 'npm';
};

export const execAsync = promisify(exec);
