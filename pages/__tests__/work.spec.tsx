import { render, screen } from "@testing-library/react";
import Work from "../work.page";
import { withTheme, withRouter } from "utils";
import { compose } from "ramda";

describe("Work Page", () => {
  beforeEach(() => {
    const Work_Test = compose(withTheme, withRouter)(Work);
    render(<Work_Test />);
  });

  it("Should render 5 sections", () => {
    expect(screen.getByText("Full stack")).toBeVisible();
    expect(screen.getByText("Front-end")).toBeVisible();
    expect(screen.getByText("Design")).toBeVisible();
    expect(screen.getByText("Tooling")).toBeVisible();
    expect(screen.getByText("Random")).toBeVisible();
  });
});
