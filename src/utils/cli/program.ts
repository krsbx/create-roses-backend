import chalk from 'chalk';
import { Command } from 'commander';
import { COLOR_SCHEME, CREATE_ROSES_BACKEND, DEFAULT_CLI_OPTIONS } from 'utils/constants';
import packageJson from '../../../package.json';

export const createPrompt = () => {
  const cliResults = DEFAULT_CLI_OPTIONS;
  const program = new Command().name(CREATE_ROSES_BACKEND);

  program
    .description('A CLI for creating a new Roses Backend')
    .argument('[dir]', 'The directory to create the new Roses Backend in')
    .option('--noGit', 'Explicitly tell to not init a git repository', false)
    .option('--noInstall', 'Explicitly tell to not install all dependencies', false)
    .option('--withTemplate', 'Explicitly tell to use all templates', false)
    .option('--withUser', 'Explicitly tell to use the user template', false)
    .option('--withFile', 'Explicitly tell to use the file template', false)
    .option('-y, --default', 'Use default values for all prompts', false)
    .version(packageJson.version, '-v, --version', 'Display the current version of CRB')
    .addHelpText(
      'afterAll',
      `\n\nThis backend is used in most of ${chalk
        .hex(COLOR_SCHEME.BRIGHT_ORANGE)
        .bold('KRSBX')} services`
    )
    .parse(process.argv);

  const cliProjectName = program.args[0];
  if (cliProjectName && typeof cliProjectName === 'string' && cliProjectName.trim() !== '')
    cliResults.appName = cliProjectName;

  cliResults.flags = program.opts();

  if (cliResults.flags.withTemplate) {
    cliResults.flags = {
      ...cliResults.flags,
      withUser: true,
      withFile: true,
    };
  }

  return cliResults;
};
