import figlet from 'figlet';
import gradient from 'gradient-string';
import { APP_TITLE, COLOR_SCHEME, MINIMUM_NODE_VERSION } from 'utils/constants';
import logger from 'utils/logger';

export const checkNodeVersion = () => {
  const versions = process.version.match(/(\d+)\.(\d+)\.(\d+)/);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const [major] = versions!.slice(1).map((_) => +_);

  if (major >= MINIMUM_NODE_VERSION) return;

  logger.error(`
You are using Node ${process.versions.node}.
${APP_TITLE} requires Node v${MINIMUM_NODE_VERSION} or higher.`);

  process.exit(1);
};

export const renderTitle = () => {
  const colors = [
    COLOR_SCHEME.BRIGHT_RED,
    COLOR_SCHEME.BRIGHT_ORANGE,
    COLOR_SCHEME.BRIGHT_PURPLE,
    COLOR_SCHEME.DARK_GREEN,
    COLOR_SCHEME.BRIGHT_GREEN,
    COLOR_SCHEME.DARK_GREEN,
    COLOR_SCHEME.BRIGHT_PURPLE,
    COLOR_SCHEME.BRIGHT_ORANGE,
    COLOR_SCHEME.BRIGHT_RED,
  ];

  const text = figlet.textSync(APP_TITLE, { font: 'Small' });
  const roseGradient = gradient(colors);

  console.log(roseGradient.multiline(text));
};
