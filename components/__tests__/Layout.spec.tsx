import { render, screen } from "@testing-library/react";
import Layout from "../layout/Layout";
import { withTheme, withRouter } from "../../utils/testUtils";
import { compose } from "ramda";

describe("Layout Component", () => {
  const mockToggle = jest.fn();

  beforeEach(() => {
    render(
      compose(
        withTheme,
        withRouter
      )(() => (
        <Layout notHome={true} toggleTheme={mockToggle}>
          <h1>I'm a child</h1>
        </Layout>
      ))
    );
  });

  it("should render without crashing", () => {
    expect(screen.getByTestId("layout")).toBeInTheDocument();
  });

  it("Should render children inside the layout", () => {
    expect(screen.getByRole("heading")).toHaveTextContent("I'm a child");
  });

  it("Expect the Nav component to be on the screen", () => {
    const nav = screen.getByRole("navigation");
    expect(nav).toBeInTheDocument();
  });
});
