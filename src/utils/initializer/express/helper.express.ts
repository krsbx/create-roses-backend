import fs from 'fs-extra';
import path from 'path';
import { rmdirAsync } from 'utils/common';

export const cleanUpMiddleware = async (projectDir: string, flags: CRB.CliFlags) => {
  const middlewareDir = path.join(projectDir, 'src/middleware');

  if (flags.withTemplate || (flags.withFile && flags.withUser)) return;

  if (!flags.withUser) await fs.rm(path.join(middlewareDir, 'users.ts'));
  if (!flags.withFile) await fs.rm(path.join(middlewareDir, 'files.ts'));
};

export const cleanUpUtils = async (projectDir: string, flags: CRB.CliFlags) => {
  const utilsDir = path.join(projectDir, 'src/utils');

  if (flags.withTemplate || (flags.withFile && flags.withUser)) return;

  if (!flags.withUser) {
    await fs.rm(path.join(utilsDir, 'token.ts'));
    await fs.rm(path.join(utilsDir, 'encryption.ts'));
  }
  if (!flags.withFile) await fs.rm(path.join(utilsDir, 'files.ts'));
};

export const cleanUpRepository = async (projectDir: string, flags: CRB.CliFlags) => {
  const repositoryRootDir = path.join(projectDir, 'src/repository');
  const repositoryDir = path.join(repositoryRootDir, 'index');

  if (flags.withTemplate || (flags.withFile && flags.withUser)) {
    await fs.move(
      path.join(repositoryDir, 'withTemplate.ts'),
      path.join(repositoryRootDir, 'index.ts')
    );
    await rmdirAsync(repositoryDir);

    return;
  }

  if (flags.withFile && !flags.withUser) {
    await fs.move(
      path.join(repositoryDir, 'withFile.ts'),
      path.join(repositoryRootDir, 'index.ts')
    );
    await fs.rm(path.join(repositoryRootDir, 'user.ts'));
    await rmdirAsync(repositoryDir);

    return;
  }

  if (!flags.withFile && flags.withUser) {
    await fs.move(
      path.join(repositoryDir, 'withUser.ts'),
      path.join(repositoryRootDir, 'index.ts')
    );
    await fs.rm(path.join(repositoryRootDir, 'file.ts'));
    await rmdirAsync(repositoryDir);

    return;
  }

  await fs.move(path.join(repositoryDir, 'default.ts'), path.join(repositoryRootDir, 'index.ts'));
  await fs.rm(path.join(repositoryRootDir, 'user.ts'));
  await fs.rm(path.join(repositoryRootDir, 'file.ts'));
  await rmdirAsync(repositoryDir);
};

export const cleanUpRoutes = async (projectDir: string, flags: CRB.CliFlags) => {
  const routesRootDir = path.join(projectDir, 'src/routes');
  const routesDir = path.join(routesRootDir, 'index');

  if (flags.withTemplate || (flags.withFile && flags.withUser)) {
    await fs.move(path.join(routesDir, 'withTemplate.ts'), path.join(routesRootDir, 'index.ts'));
    await rmdirAsync(routesDir);

    return;
  }

  if (flags.withFile && !flags.withUser) {
    await fs.move(path.join(routesDir, 'withFile.ts'), path.join(routesRootDir, 'index.ts'));
    await fs.rm(path.join(routesRootDir, 'auth.ts'));
    await fs.rm(path.join(routesRootDir, 'users.ts'));
    await rmdirAsync(routesDir);

    return;
  }

  if (!flags.withFile && flags.withUser) {
    await fs.move(path.join(routesDir, 'withUser.ts'), path.join(routesRootDir, 'index.ts'));
    await fs.rm(path.join(routesRootDir, 'files.ts'));
    await rmdirAsync(routesDir);

    return;
  }

  await fs.move(path.join(routesDir, 'default.ts'), path.join(routesRootDir, 'index.ts'));
  await fs.rm(path.join(routesRootDir, 'auth.ts'));
  await fs.rm(path.join(routesRootDir, 'users.ts'));
  await fs.rm(path.join(routesRootDir, 'files.ts'));
  await rmdirAsync(routesDir);
};
