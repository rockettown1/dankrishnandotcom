import { render, screen } from "@testing-library/react";
import WorkSection from "../work/Section";
import { withTheme } from "../../utils/testUtils";

describe.skip("work/Section Component", () => {
  const testProps = {
    data: {},
    main: {},
    id: {},
    handleClick: {},
    exitToMain: {},
  };

  beforeEach(() => {
    render(withTheme(() => <WorkSection />));
  });

  it("", () => {});
});
