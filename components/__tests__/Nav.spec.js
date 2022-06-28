import { render, screen } from "@testing-library/react";
import Nav from "../layout/Nav";
import { withTheme, withRouter } from "../../utils/testUtils";
import { compose } from "ramda";

describe("Nav Component", () => {
  beforeEach(() => {
    render(compose(withTheme, withRouter)(Nav));
  });

  it("should render", () => {
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("should include links to Hello, Work and Blog", () => {
    expect(screen.getByText("Hello")).toBeInTheDocument();
    expect(screen.getByText("Work")).toBeInTheDocument();
    expect(screen.getByText("Blog")).toBeInTheDocument();
  });
});
