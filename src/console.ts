import { ENV } from "./constants";

export const debug = (...args: string[]): void => {
  ENV._DEBUG && console.debug(format(" 🐞 DEBUG  "), args.join(" "));
};

export const clear = (): void => {
  process.stdout.clearLine(0);
  process.stdout.cursorTo(0);
};

export const progress = (progress: string): void => {
  clear();
  process.stdout.write(progress);
};

const COLORS = {
  BRIGHT: "\x1b[1m",
  DIM: "\x1b[3m",
  GREEN: "\x1b[1;32m",
  RED: "\x1b[1;31m",
  RESET: "\x1b[0m",
};

export const format = (str: string, type: keyof typeof COLORS = "BRIGHT"): string =>
  ({ false: `${COLORS[type]}${str}${COLORS.RESET}`, true: str })[`${ENV._NO_FORMAT ?? "false"}`];
