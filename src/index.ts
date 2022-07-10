#!/usr/bin/env node

import runCli from './cli';
import renderTitle from './cli/title';
import createProject from './templates';
import initializeExpress from './templates/express';

const main = async () => {
  renderTitle();

  const { appName, flags } = await runCli();

  const projectDir = await createProject(appName, flags);

  await initializeExpress(projectDir, flags);

  console.log(`Project created at ${projectDir}`);
};

main();
