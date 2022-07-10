import path from 'path';
import { getPackageManager } from '../utils/common';
import { addPackages, addScripts, initializeDirectory } from '../utils/initializer';
import { CliFlags } from '../utils/interfaces';

const createProject = async (appName: string, flags: CliFlags) => {
  const packageManager = getPackageManager();
  const projectDir = path.resolve(process.cwd(), appName);

  await initializeDirectory(appName, projectDir);

  await addPackages(projectDir, packageManager, flags);
  await addScripts(projectDir);

  return projectDir;
};

export default createProject;
