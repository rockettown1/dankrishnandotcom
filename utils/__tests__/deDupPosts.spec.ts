import { deDupPosts } from "utils/deDupPosts";

describe("deDupPosts.ts", () => {
  const testArray: any[] = [
    { sys: { id: 1 } },
    { sys: { id: 2 } },
    { sys: { id: 3 } },
    { sys: { id: 1 } },
    { sys: { id: 1 } },
  ];
  it("should take an array of objects with a sys.id property and return a deduplicated array of those objects", () => {
    expect(deDupPosts(testArray)).toHaveLength(3);
  });
});
