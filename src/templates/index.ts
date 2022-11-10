import path from 'path';
import { initializePackages } from 'utils/initializer/packages.initializer';
import { initializeDirectory } from 'utils/initializer/directory.initializer';
import { getPackageManager } from '../utils/common';

const createProject = async (appName: string, flags: CRB.CliFlags) => {
  const packageManager = getPackageManager();
  const projectDir = path.resolve(process.cwd(), appName);

  await initializeDirectory(appName, projectDir);
  await initializePackages(projectDir, packageManager, flags);

  return projectDir;
};

export default createProject;
