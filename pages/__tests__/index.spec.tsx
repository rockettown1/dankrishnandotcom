import { render } from "@testing-library/react";
import Home from "../index.page";
import userEvent from "@testing-library/user-event";
import { withTheme } from "utils";

describe("Home", () => {
  it("renders main titles", () => {
    const Home_Test = withTheme(Home);
    const { getByText } = render(<Home_Test />);
    const hello = getByText("Hello");

    expect(hello).toBeInTheDocument();
  });
});
