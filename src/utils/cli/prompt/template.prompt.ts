import inquirer from 'inquirer';
import logger from 'utils/logger';

export const getUserTemplatePermissions = async (cliResults: CRB.CliResults) => {
  const { withUser } = await inquirer.prompt<{ withUser: boolean }>({
    name: 'withUser',
    type: 'confirm',
    message: 'Would you like to use the user template?',
    default: false,
  });

  if (!withUser) {
    logger.info('User template will not be added!');
    return;
  }

  logger.info('User template will be added!');
  cliResults.flags.withUser = true;
};

export const getFileTemplatePermissions = async (cliResults: CRB.CliResults) => {
  const { withFile } = await inquirer.prompt<{ withFile: boolean }>({
    name: 'withFile',
    type: 'confirm',
    message: 'Would you like to use the file template?',
    default: false,
  });

  if (!withFile) {
    logger.info('File template will not be added!');
    return;
  }

  logger.info('File template will be added!');
  cliResults.flags.withFile = true;
};

export const getTemplatePermissions = async (cliResults: CRB.CliResults) => {
  if (cliResults.flags.withTemplate) {
    cliResults.flags = {
      ...cliResults.flags,
      withUser: true,
      withFile: true,
    };

    return;
  }

  await getUserTemplatePermissions(cliResults);
  await getFileTemplatePermissions(cliResults);
};
