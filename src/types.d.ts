declare module "bun" {
  export interface Env {
    _DEBUG: "false" | "true";
    _EXCLUDE: string[];
    _HELP: "false" | "true";
    _INCLUDE: string[];
    _NO_FORMAT: "false" | "true";
    _WRITE_TO_FILE: "false" | "true";
  }
}

export interface PackageJson {
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
  optionalDependencies: Record<string, string>;
  peerDependencies: Record<string, string>;
  resolutions: Record<string, string>;
}

export type ResolvedDependencies = string[];

export type DependencyVersions = Record<string, string>;

// TODO: Add more version types
export interface NPMResponse {
  beta: string;
  latest: string;
  next: string;
}
