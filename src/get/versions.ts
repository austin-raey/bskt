import type { DependencyVersions, NPMResponse, ResolvedDependencies } from "~/types";

import { clear, progress } from "~/console";

const getDeps = async (deps: ResolvedDependencies): Promise<DependencyVersions> =>
  deps.reduce(
    async (updatedVersions, dep) => {
      return fetch(`https://registry.npmjs.org/-/package/${dep}/dist-tags`)
        .then((res) => res.json())
        .then(async (data: NPMResponse) => {
          progress(`📦 ${dep}`);
          return data["latest"]
            ? {
                ...(await updatedVersions),
                [dep]: data["latest"],
              }
            : updatedVersions;
        })
        .catch(() => updatedVersions)
        .finally(() => clear());
    },
    Promise.resolve({} as DependencyVersions),
  );

export default getDeps;
