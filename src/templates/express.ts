import fs from 'fs-extra';
import { DIRECTORY_STRUCTURE, FILES_DIRECTORY_STRUCTURE } from '../utils/constants';
import { express } from './express/index';
import { queryParserMw } from './express/middleware/queryParser';
import { usersMw } from './express/middleware/users';
import { filesMw } from './express/middleware/files';
import { authRoutes } from './express/routes/auths';
import { fileRoutes } from './express/routes/files';
import { userRoutes } from './express/routes/users';
import { token } from './express/utils/token';
import { fileMulter } from './express/utils/files';
import * as roots from './express/utils/root';
import * as repositories from './express/repository/index';
import * as baseRepository from './express/repository/baseRepository';
import { userRepository } from './express/repository/users';
import { fileRepository } from './express/repository/files';
import { interfaces } from './express/utils/interface';
import { encryption } from './express/utils/encryption';
import { constants } from './express/utils/constants';
import { CliFlags } from '../utils/interfaces';

const createAllDirectories = async (projectDir: string) => {
  console.log('Creating directories...');

  await Promise.all(Object.values(DIRECTORY_STRUCTURE).map((p) => fs.mkdirp(`${projectDir}/${p}`)));
};

const createBaseRepository = async (projectDir: string, flags: CliFlags) => {
  let repo = '';

  repo += `${baseRepository.imports.lodash}\n`;
  repo += `${baseRepository.imports.client.start}`;

  if (flags.withUser) repo += ` ${baseRepository.imports.client.user}`;
  if (flags.withFile) repo += ` ${baseRepository.imports.client.file}`;

  repo += `${baseRepository.imports.client.end}\n`;
  repo += `${baseRepository.imports.interface}\n\n`;

  repo += `${baseRepository.prismaInstances.prisma}\n`;
  repo += `${baseRepository.prismaInstances.models}\n\n`;

  repo += `${baseRepository.types.modelStructures.start}\n`;

  if (flags.withUser) repo += `  ${baseRepository.types.modelStructures.user}\n`;
  if (flags.withFile) repo += `  ${baseRepository.types.modelStructures.file}\n`;

  repo += `${baseRepository.types.modelStructures.end}\n\n`;

  repo += `${baseRepository.types.modelName}\n`;
  repo += `${baseRepository.types.scalarFields}\n\n`;

  repo += `${baseRepository.baseRepository}\n`;

  await fs.writeFile(`${projectDir}/src/repository/baseRepository.ts`, repo);
  await fs.writeFile(`${projectDir}/src/utils/interface.ts`, interfaces);
};

const createRepository = async (projectDir: string, flags: CliFlags) => {
  let repo = '';

  if (flags.withUser) repo += `${repositories.imports.user}\n`;
  if (flags.withFile) repo += `${repositories.imports.file}\n`;

  if (flags.withUser || flags.withFile) repo += `\n`;

  repo += `${repositories.repository.start}\n`;

  if (flags.withUser) repo += `  ${repositories.repository.user}\n`;
  if (flags.withFile) repo += `  ${repositories.repository.file}\n`;

  repo += `${repositories.repository.end}\n`;

  await fs.writeFile(`${projectDir}/src/repository/index.ts`, repo);
};

const createConstants = async (projectDir: string, flags: CliFlags) => {
  let constant = '';

  if (flags.withUser) constant += constants.user;
  if (flags.withFile) constant += constants.file;

  await fs.writeFile(`${projectDir}/src/utils/constant.ts`, constant);
};

const createUserTemplate = async (projectDir: string) => {
  console.log(`Creating user template...`);

  await Promise.all([
    fs.writeFile(`${projectDir}/src/middleware/users.ts`, usersMw),
    fs.writeFile(`${projectDir}/src/repository/users.ts`, userRepository),
    fs.writeFile(`${projectDir}/src/routes/auths.ts`, authRoutes),
    fs.writeFile(`${projectDir}/src/routes/users.ts`, userRoutes),
    fs.writeFile(`${projectDir}/src/utils/encryption.ts`, encryption),
    fs.writeFile(`${projectDir}/src/utils/token.ts`, token),
  ]);

  console.log(`User template created.`);
};

const createFileTemplate = async (projectDir: string) => {
  console.log(`Creating file template...`);

  await Promise.all([
    fs.writeFile(`${projectDir}/src/middleware/files.ts`, filesMw),
    fs.writeFile(`${projectDir}/src/repository/files.ts`, fileRepository),
    fs.writeFile(`${projectDir}/src/routes/files.ts`, fileRoutes),
    fs.writeFile(`${projectDir}/src/utils/files.ts`, fileMulter),
    Object.values(FILES_DIRECTORY_STRUCTURE).map(async (p) => {
      await fs.mkdirp(`${projectDir}/${p}`);
      await fs.writeFile(`${projectDir}/${p}/.gitkeep`, '');
    }),
  ]);

  console.log(`File template created.`);
};

const createExpressRoot = async (projectDir: string, flags: CliFlags) => {
  let root = '';

  root += `${roots.imports.express}\n`;
  root += `${roots.imports.cors}\n`;
  root += `${roots.imports.queryParser}\n`;

  if (flags.withUser) {
    root += `${roots.imports.auth}\n`;
    root += `${roots.imports.user}\n`;
  }
  if (flags.withFile) root += `${roots.imports.file}\n`;

  root += `\n`;

  root += `${roots.exporter.start}\n`;
  root += `  ${roots.exporter.middleware.json}\n`;
  root += `  ${roots.exporter.middleware.url}\n`;
  root += `  ${roots.exporter.middleware.public}\n`;
  root += `  ${roots.exporter.middleware.cors}\n\n`;

  root += `  ${roots.exporter.middleware.queryParser}\n`;

  if (flags.withUser) {
    root += `  ${roots.exporter.middleware.auth}\n`;
    root += `  ${roots.exporter.middleware.users}\n`;
  }
  if (flags.withFile) root += `  ${roots.exporter.middleware.files}\n`;

  root += `${roots.exporter.end}\n`;

  await fs.writeFile(`${projectDir}/src/utils/root.ts`, root);
};

const initializeExpress = async (projectDir: string, flags: CliFlags) => {
  await createAllDirectories(projectDir);

  console.log(`Initializing express...`);

  await Promise.all([
    fs.writeFile(`${projectDir}/src/index.ts`, express),
    fs.writeFile(`${projectDir}/src/middleware/queryParser.ts`, queryParserMw),
    createExpressRoot(projectDir, flags),
    createBaseRepository(projectDir, flags),
    createRepository(projectDir, flags),
    createConstants(projectDir, flags),
    flags.withUser ? createUserTemplate(projectDir) : Promise.resolve(),
    flags.withFile ? createFileTemplate(projectDir) : Promise.resolve(),
  ]);

  console.log(`Express initialized.`);
};

export default initializeExpress;
