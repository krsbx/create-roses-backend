#!/usr/bin/env node

import runCli from './cli';
import renderTitle from './cli/title';

const main = async () => {
  renderTitle();

  await runCli();
};

main();
