import _ from 'lodash';
import { asyncMw } from 'express-asyncmw';
import repository from '../repository';
import { compareText } from '../utils/encryption';
import { signAccessToken, verifyAccessToken } from '../utils/token';
import { USER_ROLE } from '../utils/constant';

export const authMw = asyncMw(async (req, res, next) => {
  if (!req.headers.authorization) return res.status(401).json({ message: 'Unauthorized' });

  const authHeader = req.headers.authorization;
  const bearerToken = authHeader && authHeader.split(' ')[1];

  const isVerifiedToken = await verifyAccessToken(bearerToken);

  if (!isVerifiedToken) res.status(400).json({ message: 'Invalid token' });

  req.userAuth = await repository.user.findOne(isVerifiedToken.id);
  req.isAdmin = req.userAuth.role === USER_ROLE.ADMIN;

  return next();
});

export const createUserMw = asyncMw(async (req, res, next) => {
  const exist = await repository.user.checkEmailUsername(req.body.email, req.body.username);
  if (exist) return res.status(400).json(exist);

  if (!req.isAdmin) delete req.body.role;

  const data = await repository.user.resourceToModel(req.body);
  req.user = await repository.user.create(data);

  if (!req.userAuth)
    return res.json({
      message: 'User registered successfully',
    });

  return next();
});

export const getUserMw = asyncMw(async (req, res, next) => {
  // Get the user from the database base on the id or the username
  const isUsingId = !_.isNaN(+_.get(req, 'params.id'));

  const user = isUsingId
    ? await repository.user.findOne(req.params.id)
    : await repository.user.findOne({
        username: req.params.id,
      });

  if (!user) return res.status(404).json({ message: 'User not found' });

  req.user = user;

  return next();
});

export const getUsersMw = asyncMw(async (req, res, next) => {
  req.users = await repository.user.findAll({}, req.filterQueryParams, req.query);

  return next();
});

export const updateUserMw = asyncMw(async (req, res, next) => {
  if (req.userAuth.id !== +req.params.id && !req.isAdmin)
    return res.status(403).json({ message: 'Forbidden' });

  if (!req.isAdmin) delete req.body.role;

  const exist = await repository.user.checkEmailUsername(
    req.body.email,
    req.body.username,
    req.user.id
  );
  if (exist) return res.status(400).json(exist);

  const data = await repository.user.resourceToModel(req.body);
  const user = await repository.user.update(req.params.id, data);

  req.user = user;

  return next();
});

export const deleteUserMw = asyncMw(async (req, res) => {
  if (req.userAuth.id !== +req.params.id && !req.isAdmin)
    return res.status(403).json({ message: 'Forbidden' });

  await repository.user.delete(req.params.id);

  return res.status(204).json({
    message: 'User deleted',
  });
});

export const returnUserMw = asyncMw(async (req, res) => {
  return res.json(await repository.user.modelToResource(req.user));
});

export const returnUsersMw = asyncMw(async (req, res) => {
  return res.json({
    rows: await Promise.all(
      _.map(_.get(req.users, 'rows', []), (user) => repository.user.modelToResource(user))
    ),
    count: _.get(req.users, 'count', 0),
  });
});

export const loginMw = asyncMw(async (req, res) => {
  const user = await repository.user.findOne({ email: req.body.email });

  if (!user) return res.status(404).json({ message: 'User not found' });

  if (!(await compareText(req.body.password, user.password)))
    return res.status(401).json({ message: 'Invalid password' });

  const token = signAccessToken(_.pick(user, ['id', 'role']), req.body.always);

  return res.json({ id: user.id, token });
});

export const isAdminMw = asyncMw(async (req, res, next) => {
  if (!req.isAdmin) return res.status(403).json({ message: 'Forbidden' });

  return next();
});
