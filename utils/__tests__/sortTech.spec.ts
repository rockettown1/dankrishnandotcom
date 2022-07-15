import { sortTech } from "utils";
import { mockTechList } from "__mocks__/fixtures";

describe("sortTech utility function", () => {
  it("should return an array of length 6", () => {
    expect(sortTech(mockTechList)).toHaveLength(6);
  });

  it("should have an array as each item in the array", () => {
    let allArrays = true;
    sortTech(mockTechList).forEach((item) => {
      if (!Array.isArray(item)) {
        allArrays = false;
      }
    });

    expect(allArrays).toBeTruthy();
  });

  it("should have two items in the array at index 2", () => {
    const sortedTech = sortTech(mockTechList);
    expect(sortedTech[2]).toHaveLength(2);
  });
});
