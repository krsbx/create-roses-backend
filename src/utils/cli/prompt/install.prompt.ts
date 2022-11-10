import inquirer from 'inquirer';
import logger from 'utils/logger';

export const getInstallPermissions = async (cliResults: CRB.CliResults) => {
  if (cliResults.flags.noInstall) return;

  const { runInstall } = await inquirer.prompt<{ runInstall: boolean }>({
    name: 'runInstall',
    type: 'confirm',
    message: 'Would you like us to run npm install?',
    default: true,
  });

  if (runInstall) {
    logger.info('Dependencies will be installed!');
    return;
  }

  logger.info('Run `npm install` later to install all the dependencies.');
  cliResults.flags.noInstall = true;
};
