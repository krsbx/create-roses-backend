import fs from 'fs-extra';
import path from 'path';
import { rmdirAsync } from 'utils/common';

export const cleanUpMiddleware = async (projectDir: string, flags: CRB.CliFlags) => {
  if (flags.withTemplate || (flags.withFile && flags.withUser)) return;

  if (!flags.withUser) await fs.rm(path.join(projectDir, 'src/middleware/users.ts'));
  if (!flags.withFile) await fs.rm(path.join(projectDir, 'src/middleware/files.ts'));
};

export const cleanUpUtils = async (projectDir: string, flags: CRB.CliFlags) => {
  if (flags.withTemplate || (flags.withFile && flags.withUser)) return;

  if (!flags.withUser) {
    await fs.rm(path.join(projectDir, 'src/utils/token.ts'));
    await fs.rm(path.join(projectDir, 'src/utils/encryption.ts'));
  }
  if (!flags.withFile) await fs.rm(path.join(projectDir, 'src/utils/files.ts'));
};

export const cleanUpRepository = async (projectDir: string, flags: CRB.CliFlags) => {
  const repositoryDir = path.join(projectDir, 'src/repository');

  if (flags.withTemplate || (flags.withFile && flags.withUser)) {
    await fs.move(
      path.join(repositoryDir, 'index/withTemplate.ts'),
      path.join(repositoryDir, 'index.ts')
    );
    await rmdirAsync(path.join(repositoryDir, 'index'));

    return;
  }

  if (flags.withFile && !flags.withUser) {
    await fs.move(
      path.join(repositoryDir, 'index/withFile.ts'),
      path.join(repositoryDir, 'index.ts')
    );
    await rmdirAsync(path.join(repositoryDir, 'index'));

    return;
  }

  if (!flags.withFile && flags.withUser) {
    await fs.move(
      path.join(repositoryDir, 'index/withUser.ts'),
      path.join(repositoryDir, 'index.ts')
    );
    await rmdirAsync(path.join(repositoryDir, 'index'));

    return;
  }

  await fs.move(path.join(repositoryDir, 'index/default.ts'), path.join(repositoryDir, 'index.ts'));
  await fs.rm(path.join(repositoryDir, 'user.ts'));
  await fs.rm(path.join(repositoryDir, 'file.ts'));
  await rmdirAsync(path.join(repositoryDir, 'index'));
};

export const cleanUpRoutes = async (projectDir: string, flags: CRB.CliFlags) => {
  const routesDir = path.join(projectDir, 'src/routes');

  if (flags.withTemplate || (flags.withFile && flags.withUser)) {
    await fs.move(path.join(routesDir, 'index/withTemplate.ts'), path.join(routesDir, 'index.ts'));
    await rmdirAsync(path.join(routesDir, 'index'));

    return;
  }

  if (flags.withFile && !flags.withUser) {
    await fs.move(path.join(routesDir, 'index/withFile.ts'), path.join(routesDir, 'index.ts'));
    await rmdirAsync(path.join(routesDir, 'index'));

    return;
  }

  if (!flags.withFile && flags.withUser) {
    await fs.move(path.join(routesDir, 'index/withUser.ts'), path.join(routesDir, 'index.ts'));
    await rmdirAsync(path.join(routesDir, 'index'));

    return;
  }

  await fs.move(path.join(routesDir, 'index/default.ts'), path.join(routesDir, 'index.ts'));
  await fs.rm(path.join(routesDir, 'auth.ts'));
  await fs.rm(path.join(routesDir, 'users.ts'));
  await fs.rm(path.join(routesDir, 'files.ts'));
  await rmdirAsync(path.join(routesDir, 'index'));
};
