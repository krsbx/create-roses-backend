import fs from 'fs-extra';
import path from 'path';
import { rmdirAsync } from 'utils/common';
import { seqPromise } from 'utils/promises';

export const cleanUpMiddleware = (projectDir: string, flags: CRB.CliFlags) => {
  if (flags.withTemplate || (flags.withFile && flags.withUser)) return;

  if (!flags.withUser) fs.removeSync(path.join(projectDir, 'src/middleware/users.ts'));
  if (!flags.withFile) fs.removeSync(path.join(projectDir, 'src/middleware/files.ts'));
};

export const cleanUpUtils = (projectDir: string, flags: CRB.CliFlags) => {
  if (flags.withTemplate || (flags.withFile && flags.withUser)) return;

  if (!flags.withUser) {
    fs.removeSync(path.join(projectDir, 'src/utils/token.ts'));
    fs.removeSync(path.join(projectDir, 'src/utils/encryption.ts'));
  }
  if (!flags.withFile) fs.removeSync(path.join(projectDir, 'src/utils/files.ts'));
};

export const cleanUpRepository = async (projectDir: string, flags: CRB.CliFlags) => {
  const repositoryDir = path.join(projectDir, 'src/repository');

  if (flags.withTemplate || (flags.withFile && flags.withUser)) {
    await seqPromise([
      fs.move(
        path.join(repositoryDir, 'index/withTemplate.ts'),
        path.join(repositoryDir, 'index.ts')
      ),
      rmdirAsync(path.join(repositoryDir, 'index')),
    ]);

    return;
  }

  if (flags.withFile && !flags.withUser) {
    await seqPromise([
      fs.move(path.join(repositoryDir, 'index/withFile.ts'), path.join(repositoryDir, 'index.ts')),
      rmdirAsync(path.join(repositoryDir, 'index')),
    ]);

    return;
  }

  if (!flags.withFile && flags.withUser) {
    await seqPromise([
      fs.move(path.join(repositoryDir, 'index/withUser.ts'), path.join(repositoryDir, 'index.ts')),
      rmdirAsync(path.join(repositoryDir, 'index')),
    ]);

    return;
  }

  await seqPromise([
    fs.move(path.join(repositoryDir, 'index/default.ts'), path.join(repositoryDir, 'index.ts')),
    rmdirAsync(path.join(repositoryDir, 'index')),
  ]);
};

export const cleanUpRoutes = async (projectDir: string, flags: CRB.CliFlags) => {
  const routesDir = path.join(projectDir, 'src/routes');

  if (flags.withTemplate || (flags.withFile && flags.withUser)) {
    await seqPromise([
      fs.move(path.join(routesDir, 'index/withTemplate.ts'), path.join(routesDir, 'index.ts')),
      rmdirAsync(path.join(routesDir, 'index')),
    ]);

    return;
  }

  if (flags.withFile && !flags.withUser) {
    await seqPromise([
      fs.move(path.join(routesDir, 'index/withFile.ts'), path.join(routesDir, 'index.ts')),
      rmdirAsync(path.join(routesDir, 'index')),
    ]);

    return;
  }

  if (!flags.withFile && flags.withUser) {
    await seqPromise([
      fs.move(path.join(routesDir, 'index/withUser.ts'), path.join(routesDir, 'index.ts')),
      rmdirAsync(path.join(routesDir, 'index')),
    ]);

    return;
  }

  await seqPromise([
    fs.move(path.join(routesDir, 'index/default.ts'), path.join(routesDir, 'index.ts')),
    rmdirAsync(path.join(routesDir, 'index')),
  ]);
};
