export enum OperatingSystem {
  Windows = "Windows",
  MacOS = "MacOS",
  UNIX = "UNIX",
  Linux = "Linux",
  Unknown = "Unknown",
}

export type OS = keyof typeof OperatingSystem;
