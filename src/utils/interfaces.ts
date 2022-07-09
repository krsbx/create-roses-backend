export interface CliFlags {
  noInstall: boolean;
  noGit: boolean;
}

export interface CliResult {
  appName: string;
  flags: CliFlags;
}
