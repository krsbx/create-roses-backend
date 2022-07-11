#!/usr/bin/env node

import runCli from './cli';
import renderTitle from './cli/title';
import createProject from './templates';
import initializeExpress from './templates/express';
import initializePrisma from './templates/prisma';
import {
  commitChanges,
  modifyPackageJson,
  parseNameAndPath,
  removeGitIgnore,
} from './utils/common';
import { addScripts, initializeGit } from './utils/initializer';
import logger from './utils/logger';
import nextStep from './utils/nextStep';

const main = async () => {
  renderTitle();

  const { appName, flags } = await runCli();

  const [scopedAppName, projectPath] = parseNameAndPath(appName);
  const projectDir = await createProject(appName, flags);

  await addScripts(projectDir);

  await initializeExpress(projectDir, flags);
  await initializePrisma(projectDir, flags);

  if (!flags.noGit) {
    await initializeGit(projectDir);
    await commitChanges(projectDir);
  } else {
    await removeGitIgnore(projectDir);
  }

  await modifyPackageJson(projectDir, scopedAppName);

  logger.success(`\nProject created at ${projectDir}\n`);

  nextStep(scopedAppName ?? projectPath, flags);
};

main();
