import _ from 'lodash';
import { Prisma } from '@prisma/client';
import BaseRepository from './baseRepository';
import { AnyRecord, ModelStructure, MODELS_NAME } from './prisma-repo';

class File extends BaseRepository(MODELS_NAME.FILE) {
  public static async resourceToModel(resource: AnyRecord) {
    const model = _.pick(resource, ['path', 'filename', 'extension']);

    return model as Prisma.FileCreateInput;
  }

  public static async modelToResource(file: ModelStructure['file']) {
    return _.omit(file, ['createdAt', 'updatedAt']);
  }
}

export default File;
