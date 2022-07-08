import { render, screen } from "@testing-library/react";
import Work from "../work.page";
import { withTheme, withRouter } from "utils";
import { compose } from "ramda";

describe("Work Page", () => {
  beforeEach(() => {
    render(compose(withTheme, withRouter)(Work));
  });

  it("Should render 5 sections", () => {
    expect(screen.getByText("Full stack stuff")).toBeVisible();
    expect(screen.getByText("Front-end stuff")).toBeVisible();
    expect(screen.getByText("Design stuff")).toBeVisible();
    expect(screen.getByText("Tooling stuff")).toBeVisible();
    expect(screen.getByText("Random stuff")).toBeVisible();
  });
});
