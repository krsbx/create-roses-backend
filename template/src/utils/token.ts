import _ from 'lodash';
import jwtToken from 'jsonwebtoken';

const jwtSecret = _.get(process.env, 'JWT_SECRET');

export const signAccessToken = (payload: any, always = false) =>
  jwtToken.sign(payload, jwtSecret!, { ...(!always && { expiresIn: '3h' }) });

// eslint-disable-next-line no-underscore-dangle
const _verifyAccessToken = (token: string): Promise<any> =>
  new Promise((resolve) => {
    jwtToken.verify(token, jwtSecret!, (err, decoded) => {
      if (err) resolve(false);

      resolve(decoded);
    });
  });

export const verifyAccessToken = async (token: string) => _verifyAccessToken(token);

export default { signAccessToken, verifyAccessToken };
