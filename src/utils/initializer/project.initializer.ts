import path from 'path';
import { initializePackages } from './packages.initializer';
import { initializeDirectory } from './directory.initializer';

export const createProject = async (appName: string) => {
  const projectDir = path.resolve(process.cwd(), appName);

  await initializeDirectory(appName, projectDir);
  await initializePackages(projectDir);

  return projectDir;
};
