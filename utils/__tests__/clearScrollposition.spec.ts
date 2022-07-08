import { clearScrollposition } from "utils";

describe("clearScrollposition utility", () => {
  const mockRouter1 = { pathname: "/hello" };
  const mockRouter2 = { pathname: "/work/fullstack/example" };
  const mockSessionStorage = {
    scrollPosition: 1000,
    removeItem() {
      delete this["scrollPosition"];
    },
  };

  beforeEach(() => {
    mockSessionStorage.scrollPosition = 1000;
  });

  it("should remove the scrollposition from sessionStorage if the path does not include 'work'", () => {
    const result = clearScrollposition(mockRouter1.pathname, mockSessionStorage);

    expect(result.complete).toBeTruthy();
    expect(result.storage).not.toHaveProperty("scrollPosition");
  });

  it("should not remove the scroll position from sessionStorage if the path includes 'work'", () => {
    const result = clearScrollposition(mockRouter2.pathname, mockSessionStorage);

    expect(result.complete).toBeTruthy();
    expect(result.storage).toHaveProperty("scrollPosition");
  });
});
