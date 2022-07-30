export const userRepository = `import _ from 'lodash';
import { Prisma } from '@prisma/client';
import { hashText } from '../utils/encryption';
import factory from './baseRepository';
import { AnyRecord, ModelStructure, MODELS_NAME } from './models';

const userRepository = factory(MODELS_NAME.USER);

const resourceToModel = async (resource: AnyRecord) => {
  const user = _.pick(resource, ['email', 'username', 'password']);

  if (resource.password) user.password = await hashText(resource.password);

  return user as Prisma.UserCreateInput;
};

const modelToResource = async (user: ModelStructure['user']) => {
  return _.omit(user, ['password', 'updatedAt']);
};

const checkEmailUsername = async (
  email: string,
  username: string,
  id: string | number | null = null
) => {
  const checkEmail = await userRepository.findOne({
    email,
  });

  if (checkEmail && (id ? checkEmail.id !== id : true))
    return {
      message: 'Email already in use',
    };

  const checkUsername = await userRepository.findOne({
    username,
  });

  if (checkUsername && (id ? checkUsername.id !== id : true))
    return {
      message: 'Username already in use',
    };

  return null;
};

const extendsUserRepository = {
  checkEmailUsername,
  modelToResource,
  resourceToModel,
};

const repository = _.merge(userRepository, extendsUserRepository);

export default repository;
`;
