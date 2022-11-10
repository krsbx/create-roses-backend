import chalk from 'chalk';
import ora from 'ora';
import fs from 'fs-extra';
import { execAsync } from 'utils/promises';
import { GIT_IGNORE } from 'utils/constants';

export const initializeGit = async (projectDir: string) => {
  const spinner = ora('Initializing git...\n\n').start();

  let initCmd = 'git init --initial-branch=main';

  try {
    // --initial-branch flag was added in git v2.28.0
    // ref: https://github.com/t3-oss/create-t3-app/blob/main/src/helpers/initGit.ts
    const { stdout: gitVersionOutput } = await execAsync('git --version'); // git version 2.32.0 ...
    const gitVersionTag = gitVersionOutput.split(' ')[2];

    const major = gitVersionTag?.split('.')[0];
    const minor = gitVersionTag?.split('.')[1];

    if (Number(major) < 2 || Number(minor) < 28) {
      initCmd = 'git init && git branch -m main';
    }

    await execAsync(initCmd, { cwd: projectDir });
    spinner.succeed(chalk.green.bold('Git initialized.'));

    // Create .gitignore file
    await fs.writeFile(`${projectDir}/.gitignore`, GIT_IGNORE);
  } catch {
    spinner.fail(chalk.red.bold('Failed to initialize Git. Please update git to continue.'));
  }
};
