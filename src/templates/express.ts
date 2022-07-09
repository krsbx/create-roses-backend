import fs from 'fs-extra';
import { DIRECTORY_STRUCTURE } from '../utils/constants';
import EXPRESS from '../utils/express/express';
import { INTERFACE, ROOT } from '../utils/express/root';
import { QUERY_PARSER_MW } from '../utils/express/middleware';
import { BASE_REPOSITORY } from '../utils/express/repository';

const createAllDirectories = async (projectDir: string) => {
  console.log('Creating directories...');

  await Promise.all(Object.values(DIRECTORY_STRUCTURE).map((p) => fs.mkdirp(`${projectDir}/${p}`)));
};

const initializeExpress = async (projectDir: string) => {
  await createAllDirectories(projectDir);

  console.log(`Initializing express...`);

  await Promise.all([
    fs.writeFile(`${projectDir}/src/index.ts`, EXPRESS),
    fs.writeFile(`${projectDir}/src/repository/baseRepository.ts`, BASE_REPOSITORY),
    fs.writeFile(`${projectDir}/src/utils/interface.ts`, INTERFACE),
    fs.writeFile(`${projectDir}/src/middleware/queryParser.ts`, QUERY_PARSER_MW),
    fs.writeFile(`${projectDir}/src/utils/root.ts`, ROOT),
  ]);

  console.log(`Express initialized.`);
};

export default initializeExpress;
