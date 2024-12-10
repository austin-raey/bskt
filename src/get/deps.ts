import type { PackageJson, ResolvedDependencies } from "../types";

import { DEFAULT_TARGETS, ENV } from "../constants";

const getDeps = (json: PackageJson): ResolvedDependencies => {
  const includeDeps = ENV._INCLUDE ?? [];
  const excludeDeps = ENV._EXCLUDE ?? [];
  // const ignoreTypes = env._IGNORE ?? [];

  return [
    // Removes duplicates from the list of dependencies.
    ...new Set(
      DEFAULT_TARGETS.reduce((acc, targetDepKey) => {
        const depsList = json[targetDepKey];
        if (!depsList) return acc;

        Object.keys(depsList).forEach((dep) => {
          // Includes a dependency if its text includes any of the includeDeps strings.
          // e.g., i=eslint matches eslint, eslint-config-airbnb, @types/eslint, etc.
          if (includeDeps.length && !includeDeps.some((inDep) => dep.includes(inDep))) return;

          // Excludes a dependency if its text includes any of the excludeDeps strings.
          // e.g., x=eslint matches eslint, eslint-config-airbnb, @types/eslint, etc.
          if (excludeDeps.length && excludeDeps.some((exDep) => dep.includes(exDep))) return;

          // // Excludes a dependency if it includes an SemVer character as specified in the --semver flag.
          // // e.g., --semver="^" will exclude all dependencies whose version numbers start with a caret (^).
          // if (ignoreTypes.length && ignoreTypes.some((type) => depsList[dep].includes(type)))
          //   return;

          acc.push(dep);
        });

        return acc;
      }, [] as ResolvedDependencies),
    ),
  ];
};

export default getDeps;
