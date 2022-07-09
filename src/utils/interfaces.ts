export interface CliFlags {
  noInstall: boolean;
  noGit: boolean;
  default: boolean;
}

export interface CliResults {
  appName: string;
  flags: CliFlags;
}
