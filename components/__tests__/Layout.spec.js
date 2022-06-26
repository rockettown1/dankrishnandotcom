import { render, screen } from "@testing-library/react";
import Layout from "../layout/Layout";
import NextRouter from "next/router";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "../../styles/themes";

//This doesn't feel very 'unit' - come back to this

describe("Layout Component", () => {
  beforeEach(() => {
    render(
      <ThemeProvider theme={lightTheme}>
        <Layout>
          <h1>I'm a child</h1>
        </Layout>
      </ThemeProvider>
    );
  });

  const useRouter = jest.spyOn(NextRouter, "useRouter");

  useRouter.mockImplementation(() => ({
    route: "/",
    pathname: "",
    query: "",
    asPath: "",
    push: jest.fn(),
    events: {
      on: jest.fn(),
      off: jest.fn(),
    },
    beforePopState: jest.fn(() => null),
    prefetch: jest.fn(() => null),
  }));

  it("should render without crashing", () => {
    expect(screen.getByTestId("layout")).toBeInTheDocument();
  });

  it("Should render children inside the layout", () => {
    expect(screen.getByRole("heading")).toHaveTextContent("I'm a child");
  });

  it("Expect the Nav component to be on the screen", () => {
    const nav = screen.getByRole("navigation");
    expect(nav).toBeInTheDocument();
  });
});
