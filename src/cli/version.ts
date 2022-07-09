import chalk from 'chalk';
import { APP_TITLE, MINIMUM_NODE_VERSION } from '../utils/constants';

const checkVersion = () => {
  const versions = process.version.match(/(\d+)\.(\d+)\.(\d+)/);

  const [major] = versions!.slice(1).map((_) => +_);

  if (major >= MINIMUM_NODE_VERSION) return;

  console.log(
    chalk.red(`
You are using Node ${process.versions.node}.
${APP_TITLE} requires Node v${MINIMUM_NODE_VERSION} or higher.`)
  );

  process.exit(1);
};

export default checkVersion;
