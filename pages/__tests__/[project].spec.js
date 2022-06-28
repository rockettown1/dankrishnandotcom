import { render, screen } from "@testing-library/react";
import Project from "../work/frontend/[project].page";
import { withTheme, withRouter } from "../../utils/testUtils";
import { mockProjects } from "../../__mocks__/fixtures";
import { compose } from "ramda";

describe("Project Page", () => {
  beforeEach(() => render(compose(withTheme, withRouter)(() => <Project project={mockProjects[0]} />)));

  it("should render the project hero component", () => {
    expect(screen.getByTestId("hero")).toBeInTheDocument();
  });

  it("should render the featured image", () => {
    expect(screen.getByAltText(mockProjects[0].fields.featuredImage.fields.description)).toBeInTheDocument();
  });

  it("should render the main text block", () => {
    expect(screen.getByText("Text block heading")).toBeVisible();
  });

  it("should render the rich text body from contentful", () => {
    expect(screen.getByText("Technical Discussion")).toBeInTheDocument();
  });
});
