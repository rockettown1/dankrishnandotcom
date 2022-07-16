import { render } from "@testing-library/react";
import Button from "../Button";
import { withTheme } from "utils/testUtils";
import user from "@testing-library/user-event";
import { lightTheme, darkTheme } from "styles/themes";
import "jest-styled-components";

describe("Button Component", () => {
  const mockHandler = jest.fn();

  it("should render correct styles for primary", () => {
    const TestComponent = withTheme(() => (
      <Button handleClick={mockHandler} primary>
        Click Me
      </Button>
    ));
    const { getByText } = render(<TestComponent />);

    expect(getByText("Click Me")).toHaveStyle({ backgroundColor: lightTheme.highlight, border: "none" });
  });

  it("should render correct styles for secondary", () => {
    const TestComponent = withTheme(
      () => (
        <Button handleClick={mockHandler} secondary>
          Click Me
        </Button>
      ),
      "dark"
    );
    const { getByText } = render(<TestComponent />);

    expect(getByText("Click Me")).toHaveStyle({
      border: `2px solid ${darkTheme.highlight}`,
      backgroundColor: "transparent",
    });
  });

  const mockLink = "some url";

  it("should fire handler prop onClick", async () => {
    const { getByText } = render(
      <Button handleClick={mockHandler} link={mockLink}>
        Click Me
      </Button>
    );
    await user.click(getByText("Click Me"));
    expect(mockHandler).toBeCalledTimes(1);
    expect(mockHandler).toHaveBeenCalledWith(mockLink);
  });

  it("should be disabled when passed the toDisable value", () => {
    const TestComponent = withTheme(() => (
      <Button handleClick={mockHandler} toDisable={true}>
        Click Me
      </Button>
    ));
    const { getByText } = render(<TestComponent />);
    expect(getByText("Click Me")).toBeDisabled();
  });
});
