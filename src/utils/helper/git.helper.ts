import fs from 'fs-extra';
import { CREATE_ROSES_BACKEND } from 'utils/constants';
import { execAsync, seqPromise } from 'utils/promises';

// Remove .gitignore since prisma will create it
export const removeGitIgnore = (projectDir: string) => fs.remove(`${projectDir}/.gitignore`);

export const commitChanges = (projectDir: string) =>
  seqPromise([
    execAsync('git add .', { cwd: projectDir }),
    execAsync(`git commit -m "chore: init with ${CREATE_ROSES_BACKEND}"`, { cwd: projectDir }),
  ]);
