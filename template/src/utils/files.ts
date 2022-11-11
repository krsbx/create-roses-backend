import _ from 'lodash';
import multer from 'multer';
import type { Request, Response, NextFunction } from 'express';
import { EXSTENSION } from './constant';

const multerFileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    let dest = '';

    const extension = file.originalname.split('.').pop();

    switch (file.fieldname) {
      case 'images':
        if (!_.includes(EXSTENSION.IMAGE, extension))
          return cb(new Error('Image format not allowed'), '');

        dest = 'public/images';
        break;

      case 'audios':
        if (!_.includes(EXSTENSION.AUDIO, extension))
          return cb(new Error('Audio format not allowed'), '');

        dest = 'public/audios';
        break;

      case 'videos':
        if (!_.includes(EXSTENSION.VIDEO, extension))
          return cb(new Error('Video format not allowed'), '');

        dest = 'public/videos';
        break;

      default:
        dest = 'public/files';
        break;
    }

    // Multiple cast so we can add a props in the request object
    // Need to cast it to unknown before we cast it to our custom Request type
    req.fileDest = dest;

    return cb(null, dest);
  },
  filename: (req, file, cb) => {
    const fileName = `${new Date().getTime()}-${file.originalname}`;
    const extension = file.originalname.split('.').pop();

    req.body.path = `${req.fileDest}/${fileName}`;
    req.body.filename = fileName;
    req.body.extension = extension;

    cb(null, fileName);
  },
});

export const multerFileHandler = async (req: Request, res: Response, next: NextFunction) => {
  multer({ storage: multerFileStorage }).fields([
    {
      name: 'images',
      maxCount: 1,
    },
    {
      name: 'audios',
      maxCount: 1,
    },
    {
      name: 'videos',
      maxCount: 1,
    },
    {
      name: 'files',
      maxCount: 1,
    },
  ])(req, res, next); // Need to cast to any to remove type error
};
