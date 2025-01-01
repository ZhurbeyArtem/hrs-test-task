import { generateInteger } from "./generateInteger.js";
import { generateString } from "./generateString.js";
import { generateObject } from "./generateObject.js";
import { generateArrayFromSchema, generateArray } from "./generateArray.js";
import { generateBoolean } from "./generateBoolean.js";

export const generateValue = (obj, definitions = {}) => {
  const { type, minimum, maximum, pattern } = obj;
  let value;
  if (type === "string") {
    value = generateString(pattern);
  } else if (type === "integer") {
    value = generateInteger(minimum, maximum);
  } else if (type === "array") {
    if (obj.items) {
      value = generateArrayFromSchema(obj, definitions);
    } else value = generateArray();
  } else if (type === "boolean") {
    value = generateBoolean(obj);
  } else if (type === "object") {
    value = generateObject();
  } else if (type === "null") {
    value = null;
  } else if (obj?.enum) {
    value = obj.enum[generateInteger(0, obj.enum.length - 1)];
  }
  return value;
};
