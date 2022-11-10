#!/usr/bin/env node

import { renderTitle } from 'utils/cli/helper';
import { runCli } from 'cli';
import { parseNameAndPath } from 'utils/common';
import { modifyPackageJson } from 'utils/helper/json.helper';
import { initializeGit } from 'utils/initializer/git.initializer';
import { createProject } from 'utils/initializer/project.initializer';
import { initializeCustomScripts } from 'utils/initializer/script.initializer';
import { initializeExpress } from 'utils/initializer/express/express.initializer';
import { initializePrisma } from 'utils/initializer/prisma/prisma.initializer';
import logger from 'utils/logger';
import nextStep from 'utils/nextStep';
import { commitChanges } from 'utils/helper/git.helper';

const main = async () => {
  renderTitle();

  const { appName, flags } = await runCli();

  const [scopedAppName, projectPath] = parseNameAndPath(appName);
  const projectDir = await createProject(appName);

  await initializeCustomScripts(projectDir);
  await initializeExpress(projectDir, flags);
  await initializePrisma(projectDir, flags);

  if (!flags.noGit) {
    await initializeGit(projectDir);
    await commitChanges(projectDir);
  }

  await modifyPackageJson(projectDir, scopedAppName);

  logger.success(`\nProject created at ${projectDir}\n`);

  nextStep(scopedAppName ?? projectPath, flags);
};

main();
