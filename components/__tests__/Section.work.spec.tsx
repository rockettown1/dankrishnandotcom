import { render, screen } from "@testing-library/react";
import WorkSection from "../work/Section";
import { withTheme, withRouter } from "utils";
import { compose } from "ramda";

describe("work/Section Component", () => {
  const setup = () => ({
    data: {
      item: "07",
      title: "Test Section",
      desc: "Project for testing",
      link: "/test",
      img: "http://example.",
      available: true,
    },
    main: false,
    id: 1,

    exitToMain: false,
  });

  it("should render without crashing", () => {
    const testProps = setup();
    render(compose(withTheme, withRouter)(() => <WorkSection {...testProps} />));
    const section = screen.getByTestId("work/section");
    expect(section).toBeInTheDocument();
  });

  it("should have a visible button if main is false", () => {
    const testProps = setup();
    render(compose(withTheme, withRouter)(() => <WorkSection {...testProps} />));
    const button = screen.getByRole("button");
    expect(button).toBeVisible();
  });

  it("should disable the button if available is set to false", () => {
    const testProps = setup();
    testProps.data.available = false;
    render(compose(withTheme, withRouter)(() => <WorkSection {...testProps} />));
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });

  it("should not render a button if main is set to true", () => {
    const testProps = setup();
    const { rerender } = render(compose(withTheme, withRouter)(() => <WorkSection {...testProps} />));
    const button = screen.getByRole("button");
    testProps.main = true;
    rerender(compose(withTheme, withRouter)(() => <WorkSection {...testProps} />));
    expect(button).not.toBeInTheDocument();
  });

  it("should display the number of the section and the title", () => {
    const testProps = setup();
    render(compose(withTheme, withRouter)(() => <WorkSection {...testProps} />));
    expect(screen.getByText("07")).toBeVisible();
    expect(screen.getByText("Test Section")).toBeVisible();
  });

  it("should render the image at full screen height if main is set to true", () => {
    const testProps = setup();
    testProps.main = true;
    render(compose(withTheme, withRouter)(() => <WorkSection {...testProps} />));
    expect(screen.getByTestId("image-wrapper")).toHaveStyle({ height: "100vh" });
  });
});
