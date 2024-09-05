import type { PackageJson } from "./types";

export const DEFAULT_TARGETS: Partial<keyof PackageJson>[] = [
  "dependencies",
  "devDependencies",
  "optionalDependencies",
  "peerDependencies",
  "resolutions",
];
