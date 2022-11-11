import express, { Express } from 'express';
import cors from 'cors';
import routes from '../routes';
import { queryParserMw } from '../middleware/queryParser';

export default (app: Express) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static('public'));
  app.use(cors());

  app.get('*', queryParserMw);
  app.use(routes);
};
