export const userRepository = `import _ from 'lodash';
import { Prisma } from '@prisma/client';
import { hashText } from '../utils/encryption';
import BaseRepository, { ModelStructure } from './baseRepository';
import { AnyRecord } from '../utils/interface';

const userRepository = new BaseRepository<
  Prisma.UserWhereInput,
  Prisma.UserSelect,
  Prisma.UserInclude,
  Prisma.UserCreateInput,
  Prisma.UserUpdateInput,
  Prisma.UserWhereUniqueInput,
  Prisma.UserOrderByWithRelationInput
>('user');

const resourceToModel = async (resource: AnyRecord) => {
  const user = _.pick(resource, ['email', 'username', 'password']);

  if (resource.password) user.password = await hashText(resource.password);

  return user as Prisma.UserCreateInput;
};

const modelToResource = async (user: ModelStructure['user']) => {
  return _.omit(user, ['password', 'updatedAt']);
};

const getProfile = async (id: Prisma.UserWhereInput | string | number) => {
  const user = await userRepository.findOne(id, {
    include: {
      profile: true,
    },
  });

  return user;
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
  getProfile,
  checkEmailUsername,
  modelToResource,
  resourceToModel,
};

const repository = _.merge(userRepository, extendsUserRepository);

export default repository;
`;
