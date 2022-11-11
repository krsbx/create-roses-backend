/* eslint-disable no-underscore-dangle */
import _ from 'lodash';
import { asyncMw } from 'express-asyncmw';
import repository from '../repository';
import { multerFileHandler } from '../utils/files';

export const createFileMw = asyncMw(async (req, res, next) => {
  const data = await repository.file.resourceToModel(req.body);
  req.file_ = await repository.file.create(data);

  return next();
});

export const getFileMw = asyncMw(async (req, res, next) => {
  // Get the file from the database base on the id or the filename
  const isUsingId = !_.isNaN(+_.get(req, 'params.id'));

  const file = isUsingId
    ? await repository.file.findOne(req.params.id)
    : await repository.file.findOne({ filename: req.params.id });

  if (!file) return res.send(404).json({ message: 'File not found' });

  req.file_ = file;

  return next();
});

export const getFilesMw = asyncMw(async (req, res, next) => {
  req.files_ = await repository.file.findAll({}, req.filterQueryParams, req.query);

  return next();
});

export const updateFileMw = asyncMw(async (req, res, next) => {
  const data = await repository.file.resourceToModel(req.body);
  await repository.file.update(req.params.id, data);

  return next();
});

export const deleteFileMw = asyncMw(async (req, res) => {
  await repository.file.delete(req.params.id);

  return res.status(204).json({
    message: 'File deleted',
  });
});

export const returnFileMw = asyncMw(async (req, res) => {
  // Download the file when we have download query
  if (req.query.download) return res.download(req.file_.path);

  return res.json(await repository.file.modelToResource(req.file_));
});

export const returnFilesMw = asyncMw(async (req, res) => {
  return res.json({
    rows: await Promise.all(
      _.map(_.get(req, 'files_.rows', []), async (file) => repository.file.modelToResource(file))
    ),
    count: _.get(req, 'files_.count', 0),
  });
});

export const fileUploadMw = asyncMw(async (req, res, next) => {
  await multerFileHandler(req, res, next);
});
