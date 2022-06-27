import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import Tech from "../hello/Tech";
import { withTheme } from "../../utils/testUtils";
import { TechList } from "../../utils/sortTech";

describe("Tech Component", () => {
  const mockTechList: TechList = {
    fields: {
      tech: [
        {
          fields: {
            title: "",
            description: "",
            file: { url: "" },
          },
          metadata: {
            tags: [{ sys: { id: "tech2" } }],
          },
        },
        {
          fields: {
            title: "",
            description: "",
            file: { url: "" },
          },
          metadata: {
            tags: [{ sys: { id: "tech3" } }],
          },
        },
        {
          fields: {
            title: "",
            description: "",
            file: { url: "" },
          },
          metadata: {
            tags: [{ sys: { id: "tech1" } }],
          },
        },
        {
          fields: {
            title: "",
            description: "",
            file: { url: "" },
          },
          metadata: {
            tags: [{ sys: { id: "tech2" } }],
          },
        },
        {
          fields: {
            title: "",
            description: "",
            file: { url: "" },
          },
          metadata: {
            tags: [{ sys: { id: "tech5" } }],
          },
        },
      ],
    },
  };

  const mockSetTech = jest.fn();

  beforeEach(() => {
    render(withTheme(() => <Tech techList={mockTechList} setTech={mockSetTech} />));
  });

  it("should render without crashing", () => {
    expect(screen.getByText("Accurate as of June 2022")).toBeVisible();
  });
});
