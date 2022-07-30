import fs from 'fs-extra';
import path from 'path';
import { getPackageManager } from '../utils/common';
import { addPackages, initializeDirectory } from '../utils/initializer';
import { CliFlags } from '../utils/interfaces';
import repositorySetting from './repository.setting';

const createProject = async (appName: string, flags: CliFlags) => {
  const packageManager = getPackageManager();
  const projectDir = path.resolve(process.cwd(), appName);

  await initializeDirectory(appName, projectDir);

  await addPackages(projectDir, packageManager, flags);

  await fs.writeFile(`${projectDir}/repository.setting.ts`, repositorySetting);

  return projectDir;
};

export default createProject;
