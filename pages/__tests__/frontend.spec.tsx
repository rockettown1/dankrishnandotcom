import { render, screen } from "@testing-library/react";
import Frontend from "../work/frontend.page";
import { withTheme, withRouter } from "utils";
import { mockProjects } from "__mocks__/fixtures";
import { compose } from "ramda";

const frontendProjects = mockProjects.filter((project) => project.fields.type === "frontend");

describe("Frontend Page", () => {
  beforeEach(() => {
    const TestComponent = compose(withTheme, withRouter)(() => <Frontend projects={frontendProjects} />);
    render(<TestComponent />);
  });

  it("Render a title 'selected projects'", () => {
    expect(screen.getByText("Selected Projects")).toBeVisible();
  });

  it("Should render project titles", () => {
    expect(screen.getByText(frontendProjects[0].fields.name)).toBeVisible();
    expect(screen.getByText(frontendProjects[1].fields.name)).toBeVisible();
    expect(screen.getByText(frontendProjects[2].fields.name)).toBeVisible();
  });
});
