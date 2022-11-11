import { CREATE_ROSES_BACKEND } from 'utils/constants';
import { execAsync } from 'utils/promises';

export const commitChanges = async (projectDir: string) => {
  await execAsync('git add .', { cwd: projectDir });
  await execAsync(`git commit -m "chore: init with ${CREATE_ROSES_BACKEND}"`, {
    cwd: projectDir,
  });
};
