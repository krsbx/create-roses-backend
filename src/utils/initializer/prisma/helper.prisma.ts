import fs from 'fs-extra';
import path from 'path';
import { rmdirAsync } from 'utils/common';

export const cleanUpSchema = async (projectDir: string, flags: CRB.CliFlags) => {
  const schemaDir = path.join(projectDir, 'prisma');

  if (flags.withTemplate || (flags.withFile && flags.withUser)) {
    await fs.move(
      path.join(schemaDir, 'schema/withTemplate.prisma'),
      path.join(schemaDir, 'schema.prisma')
    );
    await rmdirAsync(path.join(schemaDir, 'schema'));

    return;
  }

  if (flags.withFile && !flags.withUser) {
    await fs.move(
      path.join(schemaDir, 'schema/withFile.prisma'),
      path.join(schemaDir, 'schema.prisma')
    );
    await rmdirAsync(path.join(schemaDir, 'schema'));

    return;
  }

  if (!flags.withFile && flags.withUser) {
    await fs.move(
      path.join(schemaDir, 'schema/withUser.prisma'),
      path.join(schemaDir, 'schema.prisma')
    );
    await rmdirAsync(path.join(schemaDir, 'schema'));

    return;
  }

  await fs.move(
    path.join(schemaDir, 'schema/default.prisma'),
    path.join(schemaDir, 'schema.prisma')
  );
  await rmdirAsync(path.join(schemaDir, 'schema'));
};

export const cleanUpSeed = async (projectDir: string, flags: CRB.CliFlags) => {
  const seedDir = path.join(projectDir, 'prisma/seed');

  if (flags.withUser) {
    await fs.move(path.join(seedDir, 'index/withUser.ts'), path.join(seedDir, 'index.ts'));
    await rmdirAsync(path.join(seedDir, 'index'));

    return;
  }

  await fs.move(path.join(seedDir, 'index/default.ts'), path.join(seedDir, 'index.ts'));
  await fs.rm(path.join(seedDir, 'user.ts'));
  await rmdirAsync(path.join(seedDir, 'index'));
};
