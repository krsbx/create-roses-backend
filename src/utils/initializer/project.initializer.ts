import path from 'path';
import { initializeDirectory } from './directory.initializer';
import { initializeFiles } from './files.initializer';
import { initializePackages } from './packages.initializer';

export const createProject = async (appName: string, flags: CRB.CliFlags) => {
  const projectDir = path.resolve(process.cwd(), appName);

  await initializeDirectory(appName, projectDir);
  await initializeFiles(projectDir, flags);
  await initializePackages(projectDir);

  return projectDir;
};
