import type { DependencyVersions, NPMResponse, ResolvedDependencies } from "~/types";

import { clear, progress } from "~/console";
import { REGISTRY_URL } from "~/constants";

const getDeps = async (deps: ResolvedDependencies): Promise<DependencyVersions> =>
  deps.reduce(
    async (updatedVersions, dep) => {
      return fetch(`${REGISTRY_URL}/-/package/${dep}/dist-tags`)
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
