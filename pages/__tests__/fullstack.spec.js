import { render, screen } from "@testing-library/react";
import FullStack from "../work/fullstack.page";
import { withTheme, withRouter } from "../../utils/testUtils";
import { mockProjects } from "../../__mocks__/contentfulMock";
import { compose } from "ramda";

describe("Fullstack Page", () => {
  beforeEach(() => render(compose(withTheme, withRouter)(() => <FullStack projects={mockProjects} />)));

  it("Render a title 'selected projects'", () => {
    expect(screen.getByText("Selected Projects")).toBeVisible();
  });

  it("Should render project titles", () => {
    expect(screen.getByText(mockProjects[0].fields.name)).toBeVisible();
    expect(screen.getByText(mockProjects[1].fields.name)).toBeVisible();
    expect(screen.getByText(mockProjects[2].fields.name)).toBeVisible();
  });
});
