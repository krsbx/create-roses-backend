import chalk from 'chalk';
import fs from 'fs-extra';
import inquirer from 'inquirer';
import { execAsync } from './common';
import { PACKAGES, GIT_IGNORE, SCRIPTS, DESCRIPTIONS, PRSIMA } from './constants';
import { CliFlags } from './interfaces';

export const initializeDirectory = async (appName: string, projectDir: string) => {
  if (fs.existsSync(projectDir)) {
    if (fs.readdirSync(projectDir).length === 0) {
      console.log(`${appName} exists but is empty, continuing...\n`);
    } else {
      const { overwriteDir } = await inquirer.prompt<{ overwriteDir: boolean }>({
        name: 'overwriteDir',
        type: 'confirm',
        message: `${'Warning:'} ${appName} already exists and isn't empty. Do you want to overwrite it?`,
        default: false,
      });

      if (!overwriteDir) {
        console.log(`${chalk.red('Exiting')}...`);
        process.exit(0);
      }

      console.log(`Emptying ${appName} and creating with CRB...\n`);
      await fs.emptyDir(projectDir);
    }
  } else {
    await fs.mkdirp(projectDir);
  }

  await execAsync('npm init -y', { cwd: projectDir });
};

export const addPackages = async (projectDir: string, packageManager: string, flags: CliFlags) => {
  const dependencies = Object.values(PACKAGES.DEPEDENCIES);
  const devDependencies = Object.values(PACKAGES.DEV_DEPEDENCIES);

  // Add dependencies
  await execAsync(`npx add-dependencies ${dependencies.join(' ')}`, {
    cwd: projectDir,
  });

  // Add dev dependencies
  await execAsync(`npx add-dependencies -D ${devDependencies.join(' ')}`, {
    cwd: projectDir,
  });

  if (flags.noInstall) return;

  console.log(`Installing dependencies with ${packageManager}...`);

  await execAsync(`${packageManager} install`, {
    cwd: projectDir,
  });
};

export const initializeGit = async (projectDir: string) => {
  console.log('Initializing Git...');

  let initCmd = 'git init --initial-branch=main';

  try {
    // --initial-branch flag was added in git v2.28.0
    // ref: https://github.com/t3-oss/create-t3-app/blob/main/src/helpers/initGit.ts
    const { stdout: gitVersionOutput } = await execAsync('git --version'); // git version 2.32.0 ...
    const gitVersionTag = gitVersionOutput.split(' ')[2];

    const major = gitVersionTag?.split('.')[0];
    const minor = gitVersionTag?.split('.')[1];

    if (Number(major) < 2 || Number(minor) < 28) {
      initCmd = 'git init && git branch -m main';
    }

    await execAsync(initCmd, { cwd: projectDir });
    console.log('Git initialized.');

    // Create .gitignore file
    await fs.writeFile(`${projectDir}/.gitignore`, GIT_IGNORE);
  } catch {
    console.log(chalk.red('Failed to initialize Git. Please update git to continue.'));
  }
};

export const addScripts = async (projectDir: string) => {
  console.log('Adding scripts...');

  await Promise.all(
    Object.values(SCRIPTS).map(({ name, script }) =>
      execAsync(`npm set-script ${name} "${script}"`, { cwd: projectDir })
    )
  );

  console.log('Scripts added successfully.');
};

export const modifiedPackageJson = async (projectDir: string, appName: string) => {
  const packageJson = JSON.parse(await fs.readFile(`${projectDir}/package.json`, 'utf8'));

  packageJson.name = appName;
  packageJson.description = DESCRIPTIONS;
  packageJson.prisma = PRSIMA;

  await fs.writeFile(`${projectDir}/package.json`, JSON.stringify(packageJson, null, 2));
};
