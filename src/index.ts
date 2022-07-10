#!/usr/bin/env node

import runCli from './cli';
import renderTitle from './cli/title';
import createProject from './templates';
import initializeExpress from './templates/express';
import initializePrisma from './templates/prisma';
import { commitChanges } from './utils/common';
import { modifiedPackageJson } from './utils/initializer';

const main = async () => {
  renderTitle();

  const { appName, flags } = await runCli();

  const projectDir = await createProject(appName, flags);

  await initializeExpress(projectDir, flags);
  await initializePrisma(projectDir, flags);

  if (!flags.noGit) await commitChanges(projectDir);

  await modifiedPackageJson(projectDir, appName);

  console.log(`Project created at ${projectDir}`);
};

main();
