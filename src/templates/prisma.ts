import fs from 'fs-extra';
import { execAsync } from '../utils/common';
import { INSTANCE, SEED } from '../utils/express/seed';
import { ENV } from '../utils/constants';

export const initializePrisma = async (projectDir: string) => {
  console.log('Initializing Prisma...');

  await execAsync(`npx prisma init`, { cwd: projectDir });

  await fs.mkdirp(`${projectDir}/prisma/seed`);

  console.log('Creating seed instance...');

  await Promise.all([
    fs.writeFile(`${projectDir}/prisma/seed/index.ts`, SEED),
    fs.writeFile(`${projectDir}/prisma/seed/instance.ts`, INSTANCE),
  ]);

  // Create .env file
  await fs.writeFile(`${projectDir}/.env`, ENV);
  await fs.writeFile(`${projectDir}/.env.example`, ENV);

  console.log('Prisma initialized.');
};

export default initializePrisma;
