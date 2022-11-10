#!/usr/bin/env node

import { renderTitle } from 'utils/cli/helper';
import { runCli } from 'cli';
import createProject from 'templates';
import initializeExpress from 'templates/express';
import initializePrisma from 'templates/prisma';
import { parseNameAndPath } from 'utils/common';
import { modifyPackageJson } from 'utils/helper/json.helper';
import { initializeGit } from 'utils/initializer/git.initializer';
import { initializeCustomScripts } from 'utils/initializer/script.initializer';
import logger from 'utils/logger';
import nextStep from 'utils/nextStep';
import { seqPromise } from 'utils/promises';
import { removeGitIgnore, commitChanges } from 'utils/helper/git.helper';

const main = async () => {
  renderTitle();

  const { appName, flags } = await runCli();

  const [scopedAppName, projectPath] = parseNameAndPath(appName);
  const projectDir = await createProject(appName, flags);

  await seqPromise([
    initializeCustomScripts(projectDir),
    initializeExpress(projectDir, flags),
    // initializePrisma(projectDir, flags),
  ]);

  if (!flags.noGit) await seqPromise([initializeGit(projectDir), commitChanges(projectDir)]);
  else await removeGitIgnore(projectDir);

  await modifyPackageJson(projectDir, scopedAppName);

  logger.success(`\nProject created at ${projectDir}\n`);

  nextStep(scopedAppName ?? projectPath, flags);
};

main();
