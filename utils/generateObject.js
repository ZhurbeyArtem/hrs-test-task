import { generateValue } from "./generateValue.js";

export const generateObject = (obj) => {
  const value = {};
  if (obj && obj.properties) {
    for (const [key, propSchema] of Object.entries(obj.properties)) {
      value[key] = generateValue(propSchema);
    }
  }

  return value;
};
