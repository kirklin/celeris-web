import { generateColorPalette, generateColorPalettes } from "@kirklin/palette";

export * from "./utils";

const presetPrimaryColors: Record<string, string> = {
  red: "#F53F3F",
  orangered: "#F77234",
  orange: "#FF7D00",
  gold: "#F7BA1E",
  yellow: "#FADC19",
  lime: "#9FDB1D",
  green: "#00B42A",
  cyan: "#14C9C9",
  blue: "#3491FA",
  celerisBlue: "#165DFF",
  purple: "#722ED1",
  pinkpurple: "#D91AD9",
  magenta: "#F5319D",
  gray: "#86909c",
  grey: "#86909c",
  black: "#000000",
  white: "#ffffff",
};

const presetPalettes: PalettesProps = {};
const presetDarkPalettes: PalettesProps = {};

Object.keys(presetPrimaryColors).forEach((key): void => {
  presetPalettes[key] = generateColorPalettes(presetPrimaryColors[key]);
  presetPalettes[key].primary = presetPalettes[key][5];

  // dark presetPalettes
  presetDarkPalettes[key] = generateColorPalettes(presetPrimaryColors[key], true);
  presetDarkPalettes[key].primary = presetDarkPalettes[key][5];
});

const red = presetPalettes.red;
const orangered = presetPalettes.orangered;
const gold = presetPalettes.gold;
const orange = presetPalettes.orange;
const yellow = presetPalettes.yellow;
const lime = presetPalettes.lime;
const green = presetPalettes.green;
const cyan = presetPalettes.cyan;
const blue = presetPalettes.blue;
const celerisBlue = presetPalettes.celerisBlue;
const purple = presetPalettes.purple;
const pinkpurple = presetPalettes.pinkpurple;
const magenta = presetPalettes.magenta;

const black = presetPalettes.black;
const white = presetPalettes.white;

presetPalettes.gray = [
  "#f7f8fa",
  "#f2f3f5",
  "#e5e6eb",
  "#c9cdd4",
  "#a9aeb8",
  "#86909c",
  "#6b7785",
  "#4e5969",
  "#272e3b",
  "#1d2129",
];
presetDarkPalettes.gray = [
  "#17171a",
  "#2e2e30",
  "#484849",
  "#5f5f60",
  "#78787a",
  "#929293",
  "#ababac",
  "#c5c5c5",
  "#dfdfdf",
  "#f6f6f6",
];
const gray = presetPalettes.gray;
const grey = presetPalettes.gray;
export type PalettesProps = Record<string, string[] & { primary?: string }>;

export {
  generateColorPalette,
  generateColorPalettes,
  presetPalettes,
  presetDarkPalettes,
  presetPrimaryColors,
  red,
  orangered,
  orange,
  gold,
  yellow,
  lime,
  green,
  cyan,
  blue,
  celerisBlue,
  purple,
  pinkpurple,
  magenta,
  grey,
  gray,
  black,
  white,
};
