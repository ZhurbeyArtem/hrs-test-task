import { generateInteger } from "./generateInteger.js";
import { generateString } from "./generateString.js";
import { generateObject } from "./generateObject.js";

export const generateArray = () => {
  const arr = [];
  const iterations = generateInteger();
  for (let i = 0; i <= iterations; i++) {
    arr.push(generateString());
  }
  return arr;
};
export const generateArrayFromSchema = (
  arraySchema,
  definitions,
  length = 3
) => {
  const refKey = arraySchema.items.$ref; 
  const definitionKey = refKey.replace("#", ""); 
  const definition = definitions[definitionKey]; 
  return Array.from({ length }, () => generateObject(definition));
};
