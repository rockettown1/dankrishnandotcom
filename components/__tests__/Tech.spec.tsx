import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import Tech from "../hello/Tech";
import { withTheme } from "../../utils/testUtils";
import { mockTechList } from "../../__mocks__/contentfulMock";

describe("Tech Component", () => {
  const mockSetTech = jest.fn();

  beforeEach(() => {
    render(withTheme(() => <Tech techList={mockTechList} setTech={mockSetTech} />));
  });

  it("should render without crashing", () => {
    expect(screen.getByText("Accurate as of June 2022")).toBeVisible();
  });
});
