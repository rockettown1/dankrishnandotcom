import { render, screen, waitFor } from "@testing-library/react";
import ProjectHero from "../work/ProjectHero";
import { withTheme } from "utils/testUtils";
import { Project } from "types/Project";

describe("ProjectHero Component", () => {
  const mockProject = {
    fields: {
      headline: "Some test project",
      description: "Some description about test project",
      link: "http://example.com",
      github: "",

      tech: {
        data: [{ type: "AWS", sub: ["API Gateway", "Lambda"] }],
      },
    },
  } as unknown as Project;

  it("Should render given props", () => {
    render(withTheme(() => <ProjectHero project={mockProject} />));

    const heading = screen.getByRole("heading", { level: 1 });
    const description = screen.getByText(mockProject.fields.description);
    expect(heading).toHaveTextContent(mockProject.fields.headline);
    expect(description).toHaveTextContent("Some description about test project");
  });

  it("Should render a Launch Project button if a link is provided otherwise not", async () => {
    const { rerender } = render(withTheme(() => <ProjectHero project={mockProject} />));

    //wait for buttons to animate. Prefer to check visibility (toBeVisible) rather than simply if it's in the document (toBeInTheDocument) as that's what matters to a user
    await waitFor(() => {
      expect(screen.getByText("Launch Project")).toBeVisible();
    });

    mockProject.fields.link = "";
    rerender(withTheme(() => <ProjectHero project={mockProject} />));
    expect(screen.queryByText("Launch Project")).not.toBeInTheDocument();
  });

  it("should not render a View Source button if no github url is provided, but should otherwise", async () => {
    const { rerender } = render(withTheme(() => <ProjectHero project={mockProject} />));
    expect(screen.queryByText("View Source")).not.toBeInTheDocument();

    mockProject.fields.github = "https://examplegithub.com";
    rerender(withTheme(() => <ProjectHero project={mockProject} />));
    await waitFor(() => {
      expect(screen.getByText("View Source")).toBeVisible();
    });
  });
});
