import { render } from "@testing-library/react";
import Button from "../shared/Button";
import { withTheme } from "utils/testUtils";
import user from "@testing-library/user-event";
import { lightTheme, darkTheme } from "styles/themes";
import "jest-styled-components";

describe("Button.js", () => {
  it("should render correct styles for primary", () => {
    const { getByText } = render(withTheme(() => <Button primary>Click Me</Button>));

    expect(getByText("Click Me")).toHaveStyle({ backgroundColor: lightTheme.highlight, border: "none" });
  });

  it("should render correct styles for secondary", () => {
    const { getByText } = render(withTheme(() => <Button secondary>Click Me</Button>, "dark"));

    expect(getByText("Click Me")).toHaveStyle({
      border: `2px solid ${darkTheme.highlight}`,
      backgroundColor: "transparent",
    });
  });

  //this feels like it's testing implementation details so may remove it later
  const mockHandler = jest.fn();
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
    const { getByText } = render(withTheme(() => <Button toDisable={true}>Click Me</Button>));
    expect(getByText("Click Me")).toBeDisabled();
  });
});
