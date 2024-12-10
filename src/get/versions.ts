import type { DependencyVersions, NPMResponse, ResolvedDependencies } from "~/types";

import { clear, progress } from "~/console";
import { REGISTRY_URL } from "~/constants";

const TARGET_TAG = "latest";
const getDeps = async (deps: ResolvedDependencies): Promise<DependencyVersions> =>
  deps.reduce(
    async (updatedVersions, dep) => {
      return fetch(`${REGISTRY_URL}/-/package/${dep}/dist-tags`)
        .then((res) => res.json())
        .then(async (data: NPMResponse) => {
          progress(`📦 ${dep}`);
          return data[TARGET_TAG]
            ? {
                ...(await updatedVersions),
                [dep]: data[TARGET_TAG],
              }
            : updatedVersions;
        })
        .catch(() => updatedVersions)
        .finally(() => clear());
    },
    Promise.resolve({} as DependencyVersions),
  );

export default getDeps;
