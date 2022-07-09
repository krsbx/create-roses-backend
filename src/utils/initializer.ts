import fs from 'fs-extra';
import inquirer from 'inquirer';
import { execAsync } from './common';
import { PACKAGES } from './constants';
import { CliFlags } from './interfaces';

export const initializeProject = async (appName: string, projectDir: string) => {
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
        process.exit(0);
      } else {
        console.log(`Emptying ${appName} and creating CRB...\n`);
        fs.emptyDirSync(projectDir);
      }
    }
  } else {
    fs.mkdirpSync(projectDir);
  }

  await execAsync('npm init -y', { cwd: projectDir });

  const packageJson = JSON.parse(fs.readFileSync(`${projectDir}/package.json`, 'utf8'));

  packageJson.name = appName;

  fs.writeFileSync(`${projectDir}/package.json`, JSON.stringify(packageJson, null, 2));
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
