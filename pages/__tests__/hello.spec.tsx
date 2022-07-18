import { findAllByTestId, render, screen } from "@testing-library/react";
import { withTheme } from "../../utils/testUtils";
import user from "@testing-library/user-event";
import Hello from "../hello.page";
import { mockTechList } from "../../__mocks__/fixtures";

describe("Hello Page", () => {
  beforeEach(() => {
    const Hello_Test = withTheme(Hello);
    render(<Hello_Test techList={mockTechList} />);
  });

  it("renders without crashing", async () => {
    const welcome = await screen.findByText("Hello", {}, { timeout: 3000 });
    expect(welcome).toBeInTheDocument();
  });

  it("should render all the sections", async () => {
    const sections = await screen.findAllByTestId("hello/section");
    expect(sections).toHaveLength(5);
  });

  it("should show Tech component when the link is clicked", async () => {
    const link = screen.getByText("click here");
    await user.click(link);
    expect(screen.getByText("Accurate as of June 2021")).toBeVisible();
  });

  it("should not show Tech component after Tech element is closed", async () => {
    const link = screen.getByText("click here");
    await user.click(link);
    const close = screen.getByTestId("close");
    await user.click(close);
    expect(close).not.toBeInTheDocument();
  });
});
