import { describe, expect, it } from "vitest";

import { getMarkdownSelectionToReset } from "./getMarkdownSelectionToReset";

describe("getMarkdownSelectionToReset", () => {
  it("returns the original selection when text is selected", () => {
    const selection = {
      anchor: { line: 1, ch: 2 },
      head: { line: 1, ch: 8 },
    };

    expect(getMarkdownSelectionToReset(selection, 10)).toEqual(selection);
  });

  it("falls back to the full selected line when the selection is collapsed", () => {
    expect(
      getMarkdownSelectionToReset(
        {
          anchor: { line: 1, ch: 4 },
          head: { line: 1, ch: 4 },
        },
        10
      )
    ).toEqual({
      anchor: { line: 1, ch: 0 },
      head: { line: 1, ch: 10 },
    });
  });
});
