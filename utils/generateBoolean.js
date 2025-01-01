import { generateInteger } from "./generateInteger.js";

export const generateBoolean = () => {
  return generateInteger(0, 2) > 0;
};
