export const fileRepository = `import _ from 'lodash';
import { Prisma } from '@prisma/client';
import factory, { ModelStructure } from './baseRepository';
import { AnyRecord } from '../utils/interface';

const filesRepository = factory<
  Prisma.FileWhereInput,
  Prisma.FileSelect,
  unknown, // Change this to \`Prisma.FileInclude\` if you want to include related models
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
