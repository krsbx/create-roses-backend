import { getPackageManager } from './common';
import { CliFlags } from './interfaces';
import logger from './logger';

const nextStep = (projectDir: string, flags: CliFlags) => {
  const packageManager = getPackageManager();

  logger.info('Next steps:');
  logger.info(`- cd ${projectDir}`);

  if (flags.noInstall) {
    logger.info(`- ${packageManager} install`);
  }

  logger.info('- Run `npm run migrate -- [name]` to create the database migrations.');
  logger.info('- Run `npm run seed` to seed the database.');
  logger.info(`- ${packageManager === 'npm' ? 'npm run' : `${packageManager}`} dev`);
};

export default nextStep;
