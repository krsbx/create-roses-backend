export const imports = {
  express: "import express from 'express';",
  cors: "import cors from 'cors';",
  auth: "import authsRoutes from '../routes/auths';",
  user: "import usersRoutes from '../routes/users';",
  file: "import filesRoutes from '../routes/files';",
  queryParser: "import { queryParserMw } from '../middleware/queryParser';",
};

export const exporter = {
  start: 'export default (app: Express) => {',
  middleware: {
    json: 'app.use(express.json());',
    url: 'app.use(express.urlencoded({ extended: true }));',
    public: "app.use(express.static('public'));",
    cors: 'app.use(cors());',
    queryParser: "app.get('*', queryParserMw);",
    auth: "app.use('/auth', authsRoutes);",
    users: "app.use('/users', usersRoutes);",
    files: "app.use('/files', filesRoutes);",
  },
  end: '}',
};
