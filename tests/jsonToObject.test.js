import { describe, it, expect, vi } from "vitest";
import { JsonToRandomObject } from "./jsonToObject.js";
import data from "../test.json" assert { type: "json" };

vi.mock("../utils/generateInteger.js", () => ({
  generateInteger: vi.fn().mockReturnValue(0),
}));

vi.mock("../utils/generateString.js", () => ({
  generateString: vi.fn().mockReturnValue("mockString"),
}));

vi.mock("../utils/generateValue.js", () => ({
  generateValue: vi.fn().mockImplementation((obj) => {
    if (obj.type === "string") return "mockString";
    if (obj.type === "integer") return 0;
    if (obj.type === "boolean") return true;
    return "mockString";
  }),
}));

describe("JsonToRandomObject", () => {
  it("should return an object with the correct keys and value types", () => {

    const result = JsonToRandomObject(data);

   
    expect(result).toBeInstanceOf(Object);

    // Перевіряємо, що результат має правильні ключі
    const keys = Object.keys(data.properties);
    expect(Object.keys(result)).toEqual(keys);

    expect(typeof result.title).toBe("string");
    expect(typeof result.startDate).toBe("number");
    expect(typeof result.readOnly).toBe("boolean");
  });

  it("should handle objects with 'anyOf' properties", () => {
    const mockObj = {
      properties: {
        field: {
          anyOf: [{ type: "string" }, { type: "integer" }],
        },
      },
    };
    const result = JsonToRandomObject(mockObj);
    expect(result.field).toBe("mockString");
  });
});
