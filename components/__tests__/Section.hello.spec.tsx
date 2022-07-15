import { render, screen } from "@testing-library/react";
import Section, { Props } from "../hello/Section";
import { withTheme } from "utils";

describe("hello/Section Component", () => {
  const testProps = {
    section: {
      sec: "05",
      subsec: "i",
      title: "Testing Testing",
      name: "Testing some stuff",
      desc: "This is a paragraph about testing components",
    },
    techList: {
      tech: [],
      name: "",
    },
  };

  beforeEach(() => {
    render(withTheme(() => <Section {...testProps} />));
  });

  it("should render without crashing", () => {
    const section = screen.getByTestId("hello/section");
    expect(section).toBeInTheDocument();
  });

  it("should render the title and name from the data", () => {
    const title = screen.getByText("Testing Testing");
    const name = screen.getByText("Testing some stuff");
    expect(title).toBeVisible();
    expect(name).toBeVisible();
  });

  it("should render the paragraph text from the data", () => {
    const paragraph = screen.getByTestId("desc");
    expect(paragraph).toBeVisible();
  });
});
