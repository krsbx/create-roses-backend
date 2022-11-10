import fs from 'fs-extra';
import path from 'path';
import { rmdirAsync } from 'utils/common';
import { seqPromise } from 'utils/promises';

export const cleanUpSchema = async (projectDir: string, flags: CRB.CliFlags) => {
  const schemaDir = path.join(projectDir, 'prisma');

  if (flags.withTemplate || (flags.withFile && flags.withUser)) {
    await seqPromise([
      fs.move(path.join(schemaDir, 'withTemplate.prisma'), path.join(schemaDir, 'schema.prisma')),
      rmdirAsync(path.join(schemaDir, 'schema')),
    ]);

    return;
  }

  if (flags.withFile && !flags.withUser) {
    await seqPromise([
      fs.move(path.join(schemaDir, 'withFile.prisma'), path.join(schemaDir, 'schema.prisma')),
      rmdirAsync(path.join(schemaDir, 'schema')),
    ]);

    return;
  }

  if (!flags.withFile && flags.withUser) {
    await seqPromise([
      fs.move(path.join(schemaDir, 'withUser.prisma'), path.join(schemaDir, 'schema.prisma')),
      rmdirAsync(path.join(schemaDir, 'schema')),
    ]);

    return;
  }

  await seqPromise([
    fs.move(path.join(schemaDir, 'default.prisma'), path.join(schemaDir, 'schema.prisma')),
    rmdirAsync(path.join(schemaDir, 'schema')),
  ]);
};

export const cleanUpSeed = async (projectDir: string, flags: CRB.CliFlags) => {
  const seedDir = path.join(projectDir, 'prisma/seed');

  if (flags.withUser) {
    await seqPromise([
      fs.move(path.join(seedDir, 'withUser.ts'), path.join(seedDir, 'schema.ts')),
      rmdirAsync(path.join(seedDir, 'schema')),
    ]);

    return;
  }

  await seqPromise([
    fs.move(path.join(seedDir, 'default.ts'), path.join(seedDir, 'schema.ts')),
    rmdirAsync(path.join(seedDir, 'schema')),
  ]);
};
