import fs from 'fs-extra';
import path from 'path';
import { rmdirAsync } from 'utils/common';

export const cleanUpSchema = async (projectDir: string, flags: CRB.CliFlags) => {
  const schemaRootDir = path.join(projectDir, 'prisma');
  const schemaDir = path.join(schemaRootDir, 'schema');

  if (flags.withTemplate || (flags.withFile && flags.withUser)) {
    await fs.move(
      path.join(schemaDir, 'withTemplate.prisma'),
      path.join(schemaRootDir, 'schema.prisma')
    );
    await rmdirAsync(schemaDir);

    return;
  }

  if (flags.withFile && !flags.withUser) {
    await fs.move(
      path.join(schemaDir, 'withFile.prisma'),
      path.join(schemaRootDir, 'schema.prisma')
    );
    await rmdirAsync(schemaDir);

    return;
  }

  if (!flags.withFile && flags.withUser) {
    await fs.move(
      path.join(schemaDir, 'withUser.prisma'),
      path.join(schemaRootDir, 'schema.prisma')
    );
    await rmdirAsync(schemaDir);

    return;
  }

  await fs.move(path.join(schemaDir, 'default.prisma'), path.join(schemaRootDir, 'schema.prisma'));
  await rmdirAsync(schemaDir);
};

export const cleanUpSeed = async (projectDir: string, flags: CRB.CliFlags) => {
  const seedRootDir = path.join(projectDir, 'prisma/seed');
  const seedDir = path.join(seedRootDir, 'index');

  if (flags.withUser) {
    await fs.move(path.join(seedDir, 'withUser.ts'), path.join(seedRootDir, 'index.ts'));
    await rmdirAsync(seedDir);

    return;
  }

  await fs.move(path.join(seedDir, 'default.ts'), path.join(seedRootDir, 'index.ts'));
  await fs.rm(path.join(seedRootDir, 'user.ts'));
  await rmdirAsync(seedDir);
};
