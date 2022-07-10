export const interfaces = `import { Prisma } from '@prisma/client';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyRecord = any;

export interface BaseOption<Include, Select> {
  include?: Include;
  select?: Select;
}

export interface Find<Select, Include, Cursor, Order, Distinct>
  extends BaseOption<Include, Select> {
  cursor?: Cursor;
  take?: number;
  skip?: number;
  orderBy?: Prisma.Enumerable<Order>;
  distinct?: Distinct;
}
`;
