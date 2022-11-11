import chalk from 'chalk';
import ora from 'ora';
import { isGitMainPossible } from 'utils/helper/git.helper';
import { execAsync } from 'utils/promises';

export const initializeGit = async (projectDir: string) => {
  const spinner = ora('Initializing git...\n\n').start();

  let initCmd = 'git init --initial-branch=main';

  try {
    // --initial-branch flag was added in git v2.28.0
    // ref: https://github.com/t3-oss/create-t3-app/blob/main/src/helpers/initGit.ts
    const isInitMainPossible = await isGitMainPossible();

    if (!isInitMainPossible) initCmd = 'git init';

    await execAsync(initCmd, { cwd: projectDir });
    spinner.succeed(chalk.green.bold('Git initialized.'));
  } catch {
    spinner.fail(chalk.red.bold('Failed to initialize Git. Please update git to continue.'));
  }
};
