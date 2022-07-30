export const fileRepository = `import _ from 'lodash';
import { Prisma } from '@prisma/client';
import factory from './baseRepository';
import { AnyRecord, ModelStructure, MODELS_NAME } from './models';

const filesRepository = factory(MODELS_NAME.FILE);


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
