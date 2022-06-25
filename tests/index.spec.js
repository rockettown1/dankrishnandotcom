import { render, fireEvent } from "@testing-library/react";
import Home from "../pages/index";
import userEvent from "@testing-library/user-event";
import { withTheme } from "./utils/test.utils";
import "@testing-library/jest-dom";

describe("Home", () => {
  it("renders main titles", () => {
    const { getByText } = render(withTheme(Home));
    const hello = getByText("Hello");
    const work = getByText("Work");

    expect(hello).toBeInTheDocument();
    expect(work).toBeInTheDocument();
  });
});
