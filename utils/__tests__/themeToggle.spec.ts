import { themeToggle } from "utils";
import { darkTheme, lightTheme } from "styles/themes";

const mockedRoot = {
  style: {
    "--background": "",
    "--primary_text": "",
    "--secondary_text": "",
    setProperty(prop, style) {
      this[prop] = style;
    },
  },
};

describe("themeToggle utility function", () => {
  it(`should set the background color to ${darkTheme.background} when passed "light" as current theme`, () => {
    themeToggle(mockedRoot, "light");
    expect(mockedRoot.style["--background"]).toBe(darkTheme.background);
  });

  it(`should set the primary_text color to ${lightTheme.primary_text} when passed "dark" as current theme`, () => {
    themeToggle(mockedRoot, "dark");
    expect(mockedRoot.style["--primary_text"]).toBe(lightTheme.primary_text);
  });

  it(`should set all 3 properties when called`, () => {
    themeToggle(mockedRoot, "light");
    let empty = false;
    for (let key in mockedRoot.style) {
      if (!mockedRoot.style[key]) empty = true;
    }

    expect(empty).toBeFalsy();
  });
});
