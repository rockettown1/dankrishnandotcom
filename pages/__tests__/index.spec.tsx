import { render } from "@testing-library/react";
import Home from "../index.page";
import userEvent from "@testing-library/user-event";
import { withTheme } from "utils";

describe("Home", () => {
  it("renders main titles", () => {
    const { getByText } = render(withTheme(Home));
    const hello = getByText("Hello");

    expect(hello).toBeInTheDocument();
  });
});
