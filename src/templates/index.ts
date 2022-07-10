import path from 'path';
import { getPackageManager } from '../utils/common';
import { addPackages, initializeDirectory } from '../utils/initializer';
import { CliFlags } from '../utils/interfaces';

const createProject = async (appName: string, flags: CliFlags) => {
  const packageManager = getPackageManager();
  const projectDir = path.resolve(process.cwd(), appName);

  await initializeDirectory(appName, projectDir);

  await addPackages(projectDir, packageManager, flags);

  return projectDir;
};

export default createProject;
