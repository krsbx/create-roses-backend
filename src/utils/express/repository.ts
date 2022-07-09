export const BASE_REPOSITORY = `
/* eslint-disable @typescript-eslint/ban-ts-comment */
import _ from 'lodash';
import { PrismaClient, Prisma } from '@prisma/client';
import { AnyRecord, BaseOption, Find } from '../utils/interface';

export const prisma = new PrismaClient();

export const models = _.omit(prisma, [
  '$on',
  '$connect',
  '$disconnect',
  '$use',
  '$executeRaw',
  '$executeRawUnsafe',
  '$queryRaw',
  '$queryRawUnsafe',
  '$transaction',
]);

//* Add the model types from the Prisma client
//* -- By doing this, we can use the types in the models
//! -- Please keep in mind that the keys in the Prisma client are not the same as the keys in the models
//! -- Make sure to update the types if you change the models, like this
//! -- export type ModelStructure = {
//! --   user: User, //* Notices that the key is should be in camelCase and for the types should be in PascalCase
//! -- };
export type ModelStructure = {};

export type ModelName = keyof typeof models;

export type ModelScalarFields<T extends ModelName> = ModelStructure[T];

class BaseRepository<Where, Select, Include, Create, Update, Cursor, Order> {
  constructor(protected model: ModelName) {
    this.model = model;
  }

  async findAll<T extends typeof this.model>(
    conditions: Where,
    filterQueryParams: AnyRecord = {},
    options: AnyRecord = {},
    include: Include = {} as Include
  ) {
    const limit = +(options.limit === 'all' ? 0 : _.get(options, 'limit', 10));
    const offset = options.page && options.page > 0 ? limit * (options.page - 1) : 0;
    const otherOptions = _.omit(options, ['limit', 'offset', 'page']);

    const where = { ...conditions, ...filterQueryParams, ...otherOptions };

    return {
      // @ts-ignore
      rows: (await prisma[this.model].findMany({
        where,
        ...(!_.isEmpty(include) && { include }),
        skip: offset,
        ...(limit > 0 && { take: limit }),
      })) as ModelStructure[T][],
      // eslint-disable-next-line no-underscore-dangle
      count: /* @ts-ignore */ (
        await prisma[this.model].aggregate({
          where,
          _count: true,
        })
      )._count as number,
    };
  }

  async findOne(
    conditions: Where | number | string,
    option: Find<Select, Include, Cursor, Order, ModelScalarFields<typeof this.model>> = {}
  ) {
    const dbCond = _.isObject(conditions) ? conditions : { id: _.toNumber(conditions) };

    // @ts-ignore
    return prisma[this.model].findFirst({ where: dbCond, ...option }) as Promise<ModelStructure[T]>;
  }

  async create(data: Create, option: BaseOption<Include, Select> = {}) {
    // @ts-ignore
    return models[this.model].create({
      data,
      ...option,
    });
  }

  async update(
    conditions: Where | number | string,
    data: Update | Create,
    option: BaseOption<Include, Select> = {}
  ) {
    const dbCond = _.isObject(conditions) ? conditions : { id: _.toNumber(conditions) };

    // @ts-ignore
    return models[this.model].update({
      data,
      where: dbCond,
      ...option,
    });
  }

  async delete(conditions: Where | number | string) {
    const dbCond = _.isObject(conditions) ? conditions : { id: _.toNumber(conditions) };

    // @ts-ignore
    return models[this.model].deleteMany({
      where: dbCond,
    });
  }

  async findOrCreate(
    conditions: Where | number | string,
    data: Create,
    option: Find<Select, Include, Cursor, Order, ModelScalarFields<typeof this.model>> = {}
  ) {
    const obj = await this.findOne(conditions, option);

    if (obj) return obj;

    return this.create(data);
  }

  async bulkCreate(data: Prisma.Enumerable<Create>, skipDuplicates = true) {
    // @ts-ignore
    return models[this.data].createMany({
      data,
      skipDuplicates,
    });
  }

  async bulkUpdate(where: Where, data: Prisma.Enumerable<Update>) {
    // @ts-ignore
    return models[this.data].updateMany({
      data,
      where,
    });
  }
}

export default BaseRepository;

`;
