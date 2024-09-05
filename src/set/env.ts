#!/usr/bin/env bun

import { env, type Env } from "bun";

import { debug, format } from "~/console";

type Parser = (args: string[], regex: RegExp) => string[];
const getSplitArg: Parser = (argv, regex) => {
  return (
    argv
      .find((arg) => regex.test(arg))
      ?.split(regex)[1]
      .split(",") || []
  );
};
// TODO: Regex to allow full words e.g. `bskt --debug --write`
// Current args are pretty lax, but gets the job done for now.
const VALID_ARG_TARGETS: Record<keyof Omit<Env, "NODE_ENV" | "TZ">, [RegExp, parser?: Parser]> = {
  _DEBUG: [/^((-|--))[A-z]*(d|v)/],
  _EXCLUDE: [/^(?:-|--)x=/, getSplitArg],
  _HELP: [/^((-|--))[A-z]*(h)/],
  _INCLUDE: [/^(?:-|--)i=/, getSplitArg],
  _NO_FORMAT: [/^((-|--))[A-z]*(F)/],
  _WRITE_TO_FILE: [/^((-|--))[A-z]*(w)/],
};

// TODO: Really need to figure out a way to make typescript happy here.
type TempType = ("false" | "true") & string[];

const setArgs = (argv: string[]): void => {
  const [, , ...args] = argv;
  Object.entries(VALID_ARG_TARGETS).forEach(([target, extract]) => {
    const envKey = target as keyof Env;
    env[envKey] = `${args.some((arg) => extract[0].test(arg))}` as TempType;
    if (extract[1])
      checkEnv(envKey)
        ? (env[envKey] = extract[1]?.(args, extract[0]) as TempType)
        : (env[envKey] = [] as string[] as TempType);
    debug(target, env[target] || "false");
  });

  if (checkEnv("_HELP")) {
    console.info(
      `${format(" USAGE:	  ", "BRIGHT")} bskt [options]`,
      `${format("\n EXAMPLE: ", "BRIGHT")} bskt -d -w │ bskt -dw │ bskt -d -i=eslint -x=airbnb`,
      `${format("\n\n OPTIONS: ", "BRIGHT")}`,
      `${format("\n -d, -v ")}${format(" Show debug messages 	", "DIM")} bskt -d`,
      `${format("\n -F 	")}${format(" Disable formatting 	", "DIM")} bskt -F`,
      `${format("\n -h 	")}${format(" Show this message 	", "DIM")} bskt -h`,
      `${format("\n -i 	")}${format(" Include dependencies 	", "DIM")} bskt -i=react`,
      `${format("\n -w 	")}${format(" Write updates to `package.json` ", "DIM")} bskt -w`,
      `${format("\n -x 	")}${format(" Exclude dependencies 	", "DIM")} bskt -x=eslint`,
    );
    process.exit(0);
  }
};
export default setArgs;

export const checkEnv = (key: keyof Env): boolean => {
  return env[key] === "true";
};
