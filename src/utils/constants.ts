import { CliResult } from './interfaces';

export const MINIMUM_NODE_VERSION = 14;

export const APP_TITLE = 'CREATE ROSES BACKEND';

export const DEFAULT_APP_NAME = 'my-roses-backend';

export const CREATE_ROSES_BACKEND = 'create-roses-backend';

export const DEFAULT_CLI_OPTIONS: CliResult = {
  appName: DEFAULT_APP_NAME,
  flags: {
    noInstall: false,
    noGit: false,
  },
};

export const COLOR_SCHEME = {
  BRIGHT_RED: '#E2180A',
  BRIGHT_ORANGE: '#F34B8C',
  BRIGHT_PURPLE: '#C8184F',
  BRIGHT_GREEN: '#52A849',
  DARK_GREEN: '19511E',
};
