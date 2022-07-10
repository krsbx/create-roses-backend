import inquirer from 'inquirer';
import { DEFAULT_APP_NAME } from '../utils/constants';
import { CliResults } from '../utils/interfaces';
import logger from '../utils/logger';
import { validateAppName } from '../utils/validator';

const getAppName = async (cliResults: CliResults) => {
  const { appName } = await inquirer.prompt<Pick<CliResults, 'appName'>>({
    name: 'appName',
    type: 'input',
    default: cliResults.appName,
    message: 'What will your project be called? (can be changed later)',
    validate: validateAppName,
    transformer: (input: string) => input.toLowerCase().trim(),
  });

  // eslint-disable-next-line no-param-reassign
  cliResults.appName = appName;
};

const getInstallPermissions = async (cliResults: CliResults) => {
  if (cliResults.flags.noInstall) return;

  const { runInstall } = await inquirer.prompt<{ runInstall: boolean }>({
    name: 'runInstall',
    type: 'confirm',
    message: 'Would you like us to run npm install?',
    default: true,
  });

  if (runInstall) {
    logger.info('Dependencies will be installed!');
  } else {
    logger.info('Run `npm install` later to install all the dependencies.');

    // eslint-disable-next-line no-param-reassign
    cliResults.flags.noInstall = true;
  }
};

const getGitPermissions = async (cliResults: CliResults) => {
  if (cliResults.flags.noGit) return;

  const { runGit } = await inquirer.prompt<{ runGit: boolean }>({
    name: 'runGit',
    type: 'confirm',
    message: 'Would you like us to run git init?',
    default: true,
  });

  if (runGit) {
    logger.info('Git will be initialized!');
  } else {
    logger.info('Run `git init` later to initialize a git repository.');

    // eslint-disable-next-line no-param-reassign
    cliResults.flags.noGit = true;
  }
};

const getTemplatePermissions = async (cliResults: CliResults) => {
  if (cliResults.flags.withTemplate) {
    // eslint-disable-next-line no-param-reassign
    cliResults.flags = {
      ...cliResults.flags,
      withUser: true,
      withFile: true,
    };

    return;
  }

  const { withUser } = await inquirer.prompt<{ withUser: boolean }>({
    name: 'withUser',
    type: 'confirm',
    message: 'Would you like to use the user template?',
    default: false,
  });

  if (withUser) {
    logger.info('User template will be added!');

    // eslint-disable-next-line no-param-reassign
    cliResults.flags.withUser = true;
  } else {
    logger.info('User template will not be added!');
  }

  const { withFile } = await inquirer.prompt<{ withFile: boolean }>({
    name: 'withFile',
    type: 'confirm',
    message: 'Would you like to use the file template?',
    default: false,
  });

  if (withFile) {
    logger.info('File template will be added!');

    // eslint-disable-next-line no-param-reassign
    cliResults.flags.withFile = true;
  } else {
    logger.info('File template will not be added!');
  }
};

const getAllPrompts = async (cliResults: CliResults) => {
  if (cliResults.appName === DEFAULT_APP_NAME) await getAppName(cliResults);

  await getInstallPermissions(cliResults);
  await getGitPermissions(cliResults);
  await getTemplatePermissions(cliResults);
};

export default getAllPrompts;
