const repoConfig = `// eslint-disable-next-line import/no-extraneous-dependencies
import { PrismaRepoConfig } from 'prisma-repo';

const config: PrismaRepoConfig = {
  extendExpress: true,
  overwrite: {
    baseRepository: true,
  },
  repositoryPath: 'src/repository',
  prismaLogger: true,
};

export default config;
`;

export default repoConfig;
