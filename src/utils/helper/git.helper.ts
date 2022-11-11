import { CREATE_ROSES_BACKEND } from 'utils/constants';
import { execAsync } from 'utils/promises';

export const getGitVersion = async () => {
  const { stdout: gitVersionOutput } = await execAsync('git --version'); // git version 2.32.0 ...

  return gitVersionOutput;
};

export const isGitMainPossible = async () => {
  const gitVersionOutput = await getGitVersion();

  const gitVersionTag = gitVersionOutput.split(' ')[2];

  const major = gitVersionTag?.split('.')[0];
  const minor = gitVersionTag?.split('.')[1];

  return !(Number(major) < 2 || Number(minor) < 28);
};

export const commitChanges = async (projectDir: string) => {
  await execAsync('git add .', { cwd: projectDir });
  await execAsync(`git commit -m "chore: init with ${CREATE_ROSES_BACKEND}"`, {
    cwd: projectDir,
  });

  const isInitMainPossible = await isGitMainPossible();

  if (!isInitMainPossible)
    await execAsync('git branch -m main', {
      cwd: projectDir,
    });
};
