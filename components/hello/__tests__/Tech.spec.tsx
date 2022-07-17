import { render, screen } from "@testing-library/react";
import Tech from "../Tech";
import { withTheme } from "utils/testUtils";
import { mockTechList } from "__mocks__/fixtures";

describe("Tech Component", () => {
  const mockSetTech = jest.fn();

  beforeEach(() => {
    const Tech_Test = withTheme(Tech);
    render(<Tech_Test techList={mockTechList} setTech={mockSetTech} />);
  });

  it("should render without crashing", () => {
    expect(screen.getByText("Accurate as of June 2022")).toBeVisible();
  });
});
