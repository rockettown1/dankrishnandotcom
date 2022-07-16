import { render, screen } from "@testing-library/react";
import { Nav } from "..";
import { withTheme, withRouter } from "utils";
import { compose } from "ramda";

describe("Nav Component", () => {
  beforeEach(() => {
    const TestComponent = compose(withTheme, withRouter)(Nav);
    render(<TestComponent />);
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
