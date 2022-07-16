import { render, screen } from "@testing-library/react";
import WorkTracker from "../WorkTracker";

describe("Worktracker Component", () => {
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
