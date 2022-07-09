import path from 'path';
import { getPackageManager } from '../utils/common';
import { addPackages, initializeGit, initializeProject } from '../utils/initializer';
import { CliFlags } from '../utils/interfaces';

const createProject = async (appName: string, flags: CliFlags) => {
  const packageManager = getPackageManager();
  const projectDir = path.resolve(process.cwd(), appName);

  await initializeProject(appName, projectDir);
  await addPackages(projectDir, packageManager, flags);

  if (!flags.noGit) await initializeGit(projectDir);

  return projectDir;
};

export default createProject;
