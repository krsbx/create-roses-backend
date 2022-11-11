import logger from './logger';
import { getPackageManager } from './common';
import { installPackages } from './initializer/packages.initializer';

const nextStep = async (projectDir: string, flags: CRB.CliFlags) => {
  const packageManager = getPackageManager();

  try {
    await installPackages(projectDir, packageManager, flags);
  } catch {
    flags.noInstall = true;
  } finally {
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
  }
};

export default nextStep;
