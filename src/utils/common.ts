import fs from 'fs-extra';

export const getPackageManager = () => {
  const userAgent = process.env.npm_config_package_manager;

  if (!userAgent) return 'npm';

  if (userAgent.startsWith('yarn')) return 'yarn';
  if (userAgent.startsWith('pnpm')) return 'pnpm';

  return 'npm';
};

// ref: https://github.com/t3-oss/create-t3-app/blob/main/src/utils/parseNameAndPath.ts
export const parseNameAndPath = (input: string) => {
  const paths = input.split('/');

  let appName = paths[paths.length - 1];

  // If the first part is a @, it's a scoped package
  const indexOfDelimiter = paths.findIndex((p) => p.startsWith('@'));
  if (paths.findIndex((p) => p.startsWith('@')) !== -1) {
    appName = paths.slice(indexOfDelimiter).join('/');
  }

  const path = paths.filter((p) => !p.startsWith('@')).join('/');

  return [appName, path] as const;
};

export const rmdirAsync = async (path: string) => {
  await fs.emptyDir(path);
  await fs.rmdir(path);
};
