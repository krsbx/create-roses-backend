import inquirer from 'inquirer';
import logger from 'utils/logger';

export const getGitPermissions = async (cliResults: CRB.CliResults) => {
  if (cliResults.flags.noGit) return;

  const { runGit } = await inquirer.prompt<{ runGit: boolean }>({
    name: 'runGit',
    type: 'confirm',
    message: 'Would you like us to run git init?',
    default: true,
  });

  if (runGit) {
    logger.info('Git will be initialized!');
    return;
  }

  logger.info('Run `git init` later to initialize a git repository.');
  cliResults.flags.noGit = true;
};
