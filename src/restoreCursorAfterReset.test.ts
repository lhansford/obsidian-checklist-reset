import { describe, expect, it, vi } from "vitest";

import { restoreCursorAfterReset } from "./restoreCursorAfterReset";

describe("restoreCursorAfterReset", () => {
  it("clamps the restored column to the updated line length", () => {
    const setCursor = vi.fn();

    restoreCursorAfterReset(
      {
        getLine: () => "- [ ] do thing",
        setCursor,
      },
      {
        anchor: { line: 0, ch: 20 },
        head: { line: 0, ch: 20 },
      },
      1
    );

    expect(setCursor).toHaveBeenCalledWith({
      line: 0,
      ch: "- [ ] do thing".length,
    });
  });

  it("does not restore cursor when there are multiple selections", () => {
    const setCursor = vi.fn();

    restoreCursorAfterReset(
      {
        getLine: () => "- [ ] do thing",
        setCursor,
      },
      {
        anchor: { line: 0, ch: 5 },
        head: { line: 0, ch: 5 },
      },
      2
    );

    expect(setCursor).not.toHaveBeenCalled();
  });

  it("does not restore cursor when the selection is not collapsed", () => {
    const setCursor = vi.fn();

    restoreCursorAfterReset(
      {
        getLine: () => "- [ ] do thing",
        setCursor,
      },
      {
        anchor: { line: 0, ch: 5 },
        head: { line: 0, ch: 8 },
      },
      1
    );

    expect(setCursor).not.toHaveBeenCalled();
  });

  it("restores the same collapsed cursor column when updated line is longer", () => {
    const setCursor = vi.fn();

    restoreCursorAfterReset(
      {
        getLine: () => "- [ ] do thing and then keep writing",
        setCursor,
      },
      {
        anchor: { line: 0, ch: 6 },
        head: { line: 0, ch: 6 },
      },
      1
    );

    expect(setCursor).toHaveBeenCalledWith({
      line: 0,
      ch: 6,
    });
  });
});
