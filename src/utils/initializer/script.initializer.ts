import chalk from 'chalk';
import ora from 'ora';
import { execAsync, seqPromise } from 'utils/promises';
import { SCRIPTS } from 'utils/constants';

export const initializeCustomScripts = async (projectDir: string) => {
  const spinner = ora('Adding custom scripts...\n\n').start();

  try {
    await seqPromise(
      Object.values(SCRIPTS).map(({ name, script }) =>
        execAsync(`npm set-script ${name} "${script}"`, { cwd: projectDir })
      )
    );

    spinner.succeed(chalk.green.bold('Scripts added successfully.'));
  } catch {
    spinner.fail(
      chalk.red.bold(`Failed to add scripts. Please run this manually in ${projectDir}.
  ${Object.values(SCRIPTS)
    .map(({ name, script }) => `npm set-script ${name} "${script}"`)
    .join('\n  ')}`)
    );
  }
};
