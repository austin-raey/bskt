declare module "bun" {
  export interface Env {
    _DEBUG: boolean;
    _EXCLUDE?: string[];
    _HELP: boolean;
    _IGNORE?: IGNORE_TYPES[];
    _INCLUDE?: string[];
    _NO_FORMAT: boolean;
    _WRITE_TO_FILE: boolean;
  }

  type IGNORE_TYPES = "exact" | string;
}

export type DependencyVersions = Record<string, string>;

// TODO: Add more version types
export interface NPMResponse {
  beta: string;
  latest: string;
  next: string;
}

export interface PackageJson {
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
  optionalDependencies: Record<string, string>;
  peerDependencies: Record<string, string>;
  resolutions: Record<string, string>;
}

export type ResolvedDependencies = string[];
