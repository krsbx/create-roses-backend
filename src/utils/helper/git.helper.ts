import fs from 'fs-extra';
import { CREATE_ROSES_BACKEND } from 'utils/constants';
import { execAsync } from 'utils/promises';

// Remove .gitignore since prisma will create it
export const removeGitIgnore = (projectDir: string) => fs.remove(`${projectDir}/.gitignore`);

export const commitChanges = async (projectDir: string) => {
  await execAsync('git add .', { cwd: projectDir });
  await execAsync(`git commit -m "chore: init with ${CREATE_ROSES_BACKEND}"`, {
    cwd: projectDir,
  });
};
