import type { Env } from "bun";

import type { PackageJson } from "./types";

export const DEFAULT_TARGETS: Partial<keyof PackageJson>[] = [
  "dependencies",
  "devDependencies",
  "optionalDependencies",
  "peerDependencies",
  "resolutions",
];

export const REGISTRY_URL = "https://registry.npmjs.org";

export const ENV = {
  _DEBUG: false,
  _EXCLUDE: [],
  _HELP: false,
  _IGNORE: [],
  _INCLUDE: [],
  _NO_FORMAT: false,
  _WRITE_TO_FILE: false,
} as Env;
