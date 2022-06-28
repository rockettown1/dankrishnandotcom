import { render, screen } from "@testing-library/react";
import { withTheme } from "../../utils/testUtils";
import user from "@testing-library/user-event";
import Hello from "../hello.page";
import { mockTechList } from "../../__mocks__/fixtures";

// jest.mock("../../cms/contentfulClient", () => ({
//   ...jest.requireActual("../../cms/contentfulClient"),
//   getEntries: jest.fn(),
//   //other functions you want
// }));
describe("Hello Page", () => {
  beforeEach(() => {
    render(withTheme(() => <Hello techList={mockTechList} />));
  });

  it("renders without crashing", async () => {
    const welcome = await screen.findByText("Hello", {}, { timeout: 3000 });
    expect(welcome).toBeInTheDocument();
  });

  it("should render all the sections", () => {
    expect(screen.getByText("About this site")).toBeInTheDocument();
    expect(screen.getByText("Dan Krishnan")).toBeInTheDocument();
    expect(screen.getByText("Technology")).toBeInTheDocument();
    expect(screen.getByText("Education")).toBeInTheDocument();
    expect(screen.getByText("Other creative stuff")).toBeInTheDocument();
  });

  it("should show Tech component when the link is clicked", async () => {
    const link = screen.getByText("click here");
    await user.click(link);
    expect(screen.getByText("Accurate as of June 2022")).toBeVisible();
  });

  it("should not show Tech component after Tech element is closed", async () => {
    const link = screen.getByText("click here");
    await user.click(link);
    const close = screen.getByTestId("close");
    await user.click(close);
    expect(close).not.toBeInTheDocument();
  });
});
