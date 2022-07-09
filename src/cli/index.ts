import { Command } from 'commander';
import { version } from '../../package.json';
import { CREATE_ROSES_BACKEND, DEFAULT_CLI_OPTIONS } from '../utils/constants';
import checkVersion from './version';

const runCli = async () => {
  checkVersion();

  const cliResult = DEFAULT_CLI_OPTIONS;
  const program = new Command().name(CREATE_ROSES_BACKEND);

  program
    .description('A CLI for creating a new Roses Backend')
    .argument('[dir]', 'The directory to create the new Roses Backend in')
    .option('--noGit', 'Explicitly tell to not init a git repository', false)
    .option('--noInstall', 'Explicitly tell to not install all dependencies', false)
    .version(version, '-v, --version', 'Display the current version of CRB')
    .parse(process.argv);

  const cliProjectName = program.args[0];
  if (cliProjectName) cliResult.appName = cliProjectName;

  cliResult.flags = program.opts();

  return cliResult;
};

export default runCli;
