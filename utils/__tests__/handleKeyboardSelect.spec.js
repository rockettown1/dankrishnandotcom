import { handleKeyboardSelect } from "../handleKeyboardSelect";

describe("handleKeyboardSelect utility function", () => {
  const mockEvent = { key: "" };
  const mockCallback = jest.fn();
  it("should fire callback if event.key == 'Enter'", () => {
    mockEvent.key = "Enter";
    handleKeyboardSelect(mockEvent, mockCallback);
    expect(mockCallback).toHaveBeenCalledTimes(1);
    jest.clearAllMocks();
  });

  it("should not fire callback if event.key is any letter", () => {
    mockEvent.key = "a";
    handleKeyboardSelect(mockEvent, mockCallback);
    expect(mockCallback).not.toHaveBeenCalled();
  });
});
