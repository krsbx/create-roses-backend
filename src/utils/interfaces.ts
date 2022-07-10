export interface CliFlags {
  noInstall: boolean;
  noGit: boolean;
  default: boolean;
  // Determine if the user wants to use a the templates or not.
  withTemplate: boolean;
  withUser: boolean;
  withFile: boolean;
}

export interface CliResults {
  appName: string;
  flags: CliFlags;
}
