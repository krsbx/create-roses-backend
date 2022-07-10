import path from 'path';
import { getPackageManager } from '../utils/common';
import { addPackages, addScripts, initializeGit, initializeDirectory } from '../utils/initializer';
import { CliFlags } from '../utils/interfaces';

const createProject = async (appName: string, flags: CliFlags) => {
  const packageManager = getPackageManager();
  const projectDir = path.resolve(process.cwd(), appName);

  await initializeDirectory(appName, projectDir);

  await Promise.all([
    addPackages(projectDir, packageManager, flags),
    addScripts(projectDir),
    !flags.noGit ? initializeGit(projectDir) : Promise.resolve(),
  ]);

  return projectDir;
};

export default createProject;
