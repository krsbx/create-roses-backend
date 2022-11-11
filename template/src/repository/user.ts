import _ from 'lodash';
import { Prisma } from '@prisma/client';
import { hashText } from '../utils/encryption';
import BaseRepository from './baseRepository';
import { AnyRecord, ModelStructure, MODELS_NAME } from './prisma-repo';

class User extends BaseRepository(MODELS_NAME.USER) {
  public static async resourceToModel(resource: AnyRecord) {
    const user = _.pick(resource, ['email', 'username', 'password']);

    if (resource.password) user.password = await hashText(resource.password);

    return user as Prisma.UserCreateInput;
  }

  public static async modelToResource(user: ModelStructure['user']) {
    return _.omit(user, ['password', 'updatedAt']);
  }

  public static async getProfile(id: Prisma.UserWhereInput | string | number) {
    return this.findOne(id, {
      include: {
        profile: true,
      },
    });
  }

  public static async checkEmailUsername(
    email: string,
    username: string,
    id: string | number | null = null
  ) {
    if (!_.isEmpty(email)) {
      const checkEmail = await this.findOne({
        email,
      });

      if (checkEmail && (!_.isNil(id) ? checkEmail.id !== id : true))
        return {
          message: 'Email already in use',
        };
    }

    if (!_.isEmpty(username)) {
      const checkUsername = await this.findOne({
        username,
      });

      if (checkUsername && (!_.isNil(id) ? checkUsername.id !== id : true))
        return {
          message: 'Username already in use',
        };
    }

    return null;
  }
}

export default User;
