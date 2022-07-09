#!/usr/bin/env node

import runCli from './cli';
import renderTitle from './cli/title';
import createProject from './templates';
import { execAsync } from './utils/common';

const main = async () => {
  execAsync(`npx add-dependencies mind-ar-ts`);

  renderTitle();

  const { appName, flags } = await runCli();

  const projectDir = await createProject(appName, flags);
};

main();
