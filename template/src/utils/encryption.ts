import _ from 'lodash';
import bcrypt from 'bcrypt';

const SALT_ROUND = _.toNumber(_.get(process.env, 'SALT'));

export const hashText = async (text: string) => {
  const salt = await bcrypt.genSalt(SALT_ROUND!);

  return bcrypt.hash(text, salt);
};

export const compareText = async (text: string, original: string) => {
  const result = await bcrypt.compare(text, original);

  return result;
};
