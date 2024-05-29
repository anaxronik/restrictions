import { sortFilterValues } from "./sortFilterValues";

describe("sortFilterValues", () => {
  it("should sort the values of each filter alphabetically", () => {
    const filters = {
      color: ["red", "blue", "green"],
      size: ["L", "S", "M"],
    };

    const expected = {
      color: ["blue", "green", "red"],
      size: ["L", "M", "S"],
    };

    expect(sortFilterValues(filters)).toEqual(expected);
  });

  it("should return an empty object when the input is an empty object", () => {
    const filters = {};

    const expected = {};

    expect(sortFilterValues(filters)).toEqual(expected);
  });
});
