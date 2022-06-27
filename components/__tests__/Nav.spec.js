import { render, screen } from "@testing-library/react";
import Nav from "../layout/Nav";
import { withTheme } from "../../utils/testUtils";

describe("Nav Component", () => {
  // jest.mock("next/router", () => ({
  //   useRouter() {
  //     return {
  //       route: "/",
  //       pathname: "",
  //       query: "",
  //       asPath: "",
  //       push: jest.fn(),
  //       events: {
  //         on: jest.fn(),
  //         off: jest.fn(),
  //       },
  //       beforePopState: jest.fn(() => null),
  //       prefetch: jest.fn(() => null),
  //     };
  //   },
  // }));

  const useRouter = jest.spyOn(require("next/router"), "useRouter");

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

  beforeEach(() => {
    render(withTheme(Nav));
  });

  it("should render", () => {
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  it("should include links to Hello, Work and Blog", () => {
    expect(screen.getByText("Hello")).toBeInTheDocument();
    expect(screen.getByText("Work")).toBeInTheDocument();
    expect(screen.getByText("Blog")).toBeInTheDocument();
  });
});
