export const ROOT = `
import express, { Express } from 'express';
import cors from 'cors';
import { queryParserMw } from '../middleware/queryParser';

export default (app: Express) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static('public'));
  app.use(cors());

  app.get('*', queryParserMw);
};

`;

export const INTERFACE = `
import { Prisma } from '@prisma/client';

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
