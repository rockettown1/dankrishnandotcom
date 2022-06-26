import { render, fireEvent } from "@testing-library/react";
import Home from "../index";
import userEvent from "@testing-library/user-event";
import { withTheme } from "../../utils/testUtils";

describe("Home", () => {
  it("renders main titles", () => {
    const { getByText } = render(withTheme(Home));
    const hello = getByText("Hello");

    expect(hello).toBeInTheDocument();
  });
});
