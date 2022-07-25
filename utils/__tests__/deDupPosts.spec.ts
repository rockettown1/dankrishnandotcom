import { deDupPosts } from "utils/deDupPosts";
import { IPost } from "types/generated/contentful";

describe("deDupPosts.ts", () => {
  const testArray: any[] = [
    { sys: { id: 1 }, fields: { date: new Date(Date.now()).toISOString() } },
    { sys: { id: 2 }, fields: { date: new Date(Date.now()).toISOString() } },
    { sys: { id: 3 }, fields: { date: new Date(Date.now()).toISOString() } },
    { sys: { id: 1 }, fields: { date: new Date(Date.now()).toISOString() } },
    { sys: { id: 1 }, fields: { date: new Date(Date.now()).toISOString() } },
  ];
  it("should take an array of objects with a sys.id property and return a deduplicated array of those objects", () => {
    expect(deDupPosts(testArray)).toHaveLength(3);
  });

  it("should return an array whose are objects arranged in descending date order newest first (reversed)", () => {
    const order = deDupPosts(testArray).map((post) => post.sys.id);
    const resultOrder = [3, 2, 1];
    expect(order).toEqual(resultOrder);
  });
});
