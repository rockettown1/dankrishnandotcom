import { render, screen } from "@testing-library/react";
import WorkTracker from "../layout/WorkTracker";

describe("Worktracker Component", () => {
  /*NOTE: The commented out tests below test implementation details (px width) and have been left here as an example of what not to do in tests. The below active tests instead test for visible differences in the active and non active lines (by comparing elements) which is what the user will ultimately see.
   */

  // it("Should have a div with width 40px when the activeline matches the index of the div", () => {
  //   const testActiveLine = 2;
  //   render(<WorkTracker activeLine={testActiveLine} />);
  //   const container = screen.getByTestId("tracker");
  //   const currentLine = container.children[testActiveLine];
  //   expect(currentLine).toHaveStyle({ width: "40px" });
  // });

  // it("should render all other div (not activeLine) with width 20px", () => {
  //   const testActiveLine = 2;
  //   const divIndexNonActive = 1;
  //   render(<WorkTracker activeLine={testActiveLine} />);
  //   const container = screen.getByTestId("tracker");
  //   const currentLine = container.children[divIndexNonActive];
  //   expect(currentLine).toHaveStyle({ width: "20px" });
  // });

  it("should have a visible difference between an active line and non active line", () => {
    const mockActiveLine = 2;
    const mockNonActiveLine = 1;
    render(<WorkTracker activeLine={mockActiveLine} />);
    const container = screen.getByTestId("tracker");
    const activeLine = container.children[mockActiveLine];
    const nonActiveLine = container.children[mockNonActiveLine];
    expect(activeLine).not.toEqual(nonActiveLine);
  });

  it("should have no visible difference between two non active lines", () => {
    const mockActiveLine = 2;
    const nonActiveA = 1;
    const nonActiveB = 3;

    render(<WorkTracker activeLine={mockActiveLine} />);
    const container = screen.getByTestId("tracker");
    const FirstNonActiveLine = container.children[nonActiveA];
    const SecondNonActiveLine = container.children[nonActiveB];
    expect(FirstNonActiveLine).toEqual(SecondNonActiveLine);
  });
});
