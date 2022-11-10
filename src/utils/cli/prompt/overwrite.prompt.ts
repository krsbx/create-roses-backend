import chalk from 'chalk';
import inquirer from 'inquirer';

export const getOverwritePermissions = async (appName: string) => {
  const { overwriteDir } = await inquirer.prompt<{ overwriteDir: boolean }>({
    name: 'overwriteDir',
    type: 'confirm',
    message: `${chalk.redBright.bold('Warning:')} ${chalk.cyan.bold(
      appName
    )} already exists and isn't empty. Do you want to overwrite it?`,
    default: false,
  });

  return overwriteDir;
};
