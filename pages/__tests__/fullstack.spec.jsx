import { render, screen } from "@testing-library/react";
import FullStack from "../work/fullstack.page";
import { withTheme, withRouter } from "utils";
import { mockProjects } from "__mocks__/fixtures";
import { compose } from "ramda";

const fullstackProjects = mockProjects.filter((project) => project.fields.type === "fullstack");

describe("Fullstack Page", () => {
  beforeEach(() => {
    const TestComponent = compose(withTheme, withRouter)(() => <FullStack projects={fullstackProjects} />);

    render(<TestComponent />);
  });

  it("Render a title 'selected projects'", () => {
    expect(screen.getByText("Selected Projects")).toBeVisible();
  });

  it("Should render project titles", () => {
    expect(screen.getByText(fullstackProjects[0].fields.name)).toBeVisible();
    expect(screen.getByText(fullstackProjects[1].fields.name)).toBeVisible();
    expect(screen.getByText(fullstackProjects[2].fields.name)).toBeVisible();
  });
});
