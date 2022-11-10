import { getPackageManager } from './common';
import logger from './logger';

const nextStep = (projectDir: string, flags: CRB.CliFlags) => {
  const packageManager = getPackageManager();

  logger.info('Next steps:');
  logger.info(`- cd ${projectDir}`);

  if (flags.noInstall) {
    logger.info(`- ${packageManager} install`);
  }

  logger.info('- Run `npx prisma-repo --model-structures`');
  logger.info('- Run `npx prisma-repo --base-repository`');
  logger.info('- Run `npm run migrate -- [name]` to create the database migrations.');
  logger.info('- Run `npm run seed` to seed the database.');
  logger.info(`- ${packageManager === 'npm' ? 'npm run' : `${packageManager}`} dev`);
};

export default nextStep;
