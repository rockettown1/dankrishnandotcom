import { render, screen } from "@testing-library/react";
import Tech from "../Tech";
import { withTheme } from "utils/testUtils";
import { mockTechList } from "__mocks__/fixtures";

describe("Tech Component", () => {
  const mockSetTech = jest.fn();

  beforeEach(() => {
    const TestComponent = withTheme(() => <Tech techList={mockTechList} setTech={mockSetTech} />);
    render(<TestComponent />);
  });

  it("should render without crashing", () => {
    expect(screen.getByText("Accurate as of June 2022")).toBeVisible();
  });
});
