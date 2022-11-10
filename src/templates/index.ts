import fs from 'fs-extra';
import path from 'path';
import { initializePackages } from 'utils/initializer/packages.initializer';
import { initializeDirectory } from 'utils/initializer/directory.initializer';
import { seqPromise } from 'utils/promises';
import { getPackageManager } from '../utils/common';
import repositorySetting from './repository.setting';

const createProject = async (appName: string, flags: CRB.CliFlags) => {
  const packageManager = getPackageManager();
  const projectDir = path.resolve(process.cwd(), appName);

  await seqPromise([
    initializeDirectory(appName, projectDir),
    initializePackages(projectDir, packageManager, flags),
  ]);

  await fs.writeFile(`${projectDir}/repository.setting.ts`, repositorySetting);

  return projectDir;
};

export default createProject;
