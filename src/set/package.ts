import { type BunFile, nanoseconds, write } from "bun";

import type { DependencyVersions, PackageJson } from "~/types";

import { debug, format } from "~/console";
import { DEFAULT_TARGETS, ENV } from "~/constants";

const setPackageJson = async (
  filePackageJson: BunFile,
  objPackageJson: PackageJson,
  updatedDeps: DependencyVersions,
): Promise<void> => {
  let WAS_MODIFIED = false;

  const updatedDepNames = Object.keys(updatedDeps);
  if (updatedDepNames.length) {
    updatedDepNames.forEach((dep) => {
      const updatedVersion = updatedDeps[dep];

      DEFAULT_TARGETS.forEach((target) => {
        // These could be combined but it makes the debug log more clean.
        const currentVersion = objPackageJson[target]?.[dep];
        if (!currentVersion) return;
        debug(`${dep}`, "\tcurrentVersion:", currentVersion, "\tupdatedVersion:", updatedVersion);
        if (currentVersion.includes(updatedVersion)) return;

        const [versionMarker = ""] = /[\^~]/.exec(currentVersion) || [];
        const updatedVersionStr = `${versionMarker}${updatedVersion}`;
        objPackageJson[target][dep] = updatedVersionStr;
        WAS_MODIFIED = true;

        console.log(
          `${format(` 🥟 ${dep} `)}${format(` ${target} `, "DIM")} ${format(currentVersion, "RED")} → ${format(updatedVersionStr, "GREEN")}`,
        );
      });
    });
  }
  if (WAS_MODIFIED) {
    // await filePackageJson.write(objPackageJson);
    if (ENV._WRITE_TO_FILE) {
      await write(filePackageJson, JSON.stringify(objPackageJson, null, 2));
      console.log(" 📝 Updated package.json.");
    } else {
      console.log(` ⏭️ Skipping file write. Use ${format("-w")} to write changes to package.json.`);
    }
  } else {
    console.log(" 🧺 No updates found.");
  }
  console.log(` ⏰ ${Math.round((nanoseconds() / 1e6 / 1e3) * 10000) / 10000}s`);
};
export default setPackageJson;
