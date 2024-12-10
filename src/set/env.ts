#!/usr/bin/env bun

import { type Env } from "bun";

import { debug, format } from "~/console";
import { ENV } from "~/constants";

type Parser = (args: string[], regex: RegExp) => string[];
const getSplitArg: Parser = (argv, regex) => {
  const arg = argv.find((arg) => regex.test(arg));
  return arg?.split("=").at(-1)?.split(",") || [];
};
// Current args are pretty lax, but gets the job done for now.
const VALID_ARG_TARGETS: Record<keyof Omit<Env, "NODE_ENV" | "TZ">, [RegExp, parser?: Parser]> = {
  _DEBUG: [/^((-|--))(d|v)/],
  _EXCLUDE: [/^(-|--)x/, getSplitArg],
  _HELP: [/^((-|--))(h)/],
  _IGNORE: [/^(-|--)(ignore)/, getSplitArg],
  _INCLUDE: [/^(-|--)i/, getSplitArg],
  _NO_FORMAT: [/^((-|--))(F)/],
  _WRITE_TO_FILE: [/^((-|--))(w)/],
};

// TODO: Really need to figure out a way to make typescript happy here.
const setArgs = (argv: string[]): void => {
  const [, , ...args] = argv;

  // This helps support flags with or without the equal sign.
  // e.g., -i=eslint,1234 or -i eslint,1234
  // On Powershell, = sign on a flag can potentially error if not supplied quotes.
  for (let i = 0; i < args.length; i++) {
    if (!args[i].includes("=") && i + 1 < args.length && !args[i + 1].startsWith("-")) {
      args[i] = `${args[i]}=${args[i + 1]}`;
      args.splice(i + 1, 1);
    }
  }

  // Parses the arguments and sets the environment variables accordingly.
  Object.entries(VALID_ARG_TARGETS).forEach(([target, extract]) => {
    const envKey = target as keyof Env;
    if (extract[1]) {
      ENV[envKey] = extract[1](args, extract[0]);
    } else {
      ENV[envKey] = args.some((arg) => extract[0].test(arg));
    }
    debug(target, `${ENV[envKey]}`);
  });

  if (ENV._HELP) {
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
