import { countSlash } from "utils";

describe("countSlash utility function", () => {
  const test1 = "/work/fullstack";
  const test2 = "/work/fullstack/someproject/example";

  it("should return 2 when passed test1", () => {
    expect(countSlash(test1)).toEqual(2);
  });

  it("should return 4 when passed test2", () => {
    expect(countSlash(test2)).toEqual(4);
  });
});
