export const fileRepository = `import _ from 'lodash';
import { Prisma } from '@prisma/client';
import BaseRepository, { ModelStructure } from './baseRepository';
import { AnyRecord } from '../utils/interface';

const filesRepository = new BaseRepository<
  Prisma.FileWhereInput,
  Prisma.FileSelect,
  Prisma.FileInclude,
  Prisma.FileCreateInput,
  Prisma.FileUpdateInput,
  Prisma.FileWhereUniqueInput,
  Prisma.FileOrderByWithRelationInput
>('file');

const resourceToModel = async (resource: AnyRecord) => {
  const model = _.pick(resource, ['path', 'filename', 'extension']);

  return model as Prisma.FileCreateInput;
};

const modelToResource = async (file: ModelStructure['file']) => {
  return _.omit(file, ['createdAt', 'updatedAt']);
};

const extendsFileRepository = {
  modelToResource,
  resourceToModel,
};

const repository = _.merge(filesRepository, extendsFileRepository);

export default repository;
`;
