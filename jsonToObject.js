import data from "./data.json" assert { type: "json" };
import { generateValue } from "./utils/generateValue.js";
import { generateInteger } from "./utils/generateInteger.js";

export const JsonToRandomObject = (obj) => {
  const properties = Object.values(obj.properties);
  const keys = Object.keys(obj.properties);
  const result = {};
  for (let i = 0; i < properties.length; i++) {
    let val;
    if (properties[i].type) {
      val = generateValue(properties[i], obj.definitions);
    } else {
      const randType = generateInteger(0, properties[i].anyOf.length - 1);
      val = generateValue(properties[i].anyOf[randType], obj.definitions);
    }
    result[keys[i]] = val;
  }
  return result;
};

console.log(JsonToRandomObject(data));
