import path from 'path';
import fs from 'fs-extra';
import { PKG_ROOT } from 'utils/constants';

export const initializeFiles = async (projectDir: string, flags: CRB.CliFlags) => {
  const rootDir = path.join(PKG_ROOT, 'template');

  await fs.copy(path.join(rootDir, '_env'), path.join(projectDir, '.env'));
  await fs.copy(path.join(rootDir, '_env'), path.join(projectDir, '.env.example'));
  await fs.copy(path.join(rootDir, 'package.json'), path.join(projectDir, 'package.json'));
  await fs.copy(
    path.join(rootDir, 'repository.setting.ts'),
    path.join(projectDir, 'repository.setting.ts')
  );
  await fs.copy(path.join(rootDir, 'tsconfig.json'), path.join(projectDir, 'tsconfig.json'));
  await fs.copy(
    path.join(rootDir, 'tsconfig.build.json'),
    path.join(projectDir, 'tsconfig.build.json')
  );

  if (!flags.noGit)
    await fs.copy(path.join(rootDir, '_gitignore'), path.join(projectDir, '.gitignore'));
};
