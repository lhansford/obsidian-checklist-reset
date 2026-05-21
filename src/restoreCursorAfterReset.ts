import type { EditorPosition, EditorSelection } from "obsidian";

type EditorLike = {
  getLine: (line: number) => string;
  setCursor: (position: EditorPosition) => void;
};

export function restoreCursorAfterReset(
  editor: EditorLike,
  selection: EditorSelection,
  selectionCount: number
) {
  const isCollapsed =
    selection.anchor.line === selection.head.line &&
    selection.anchor.ch === selection.head.ch;

  if (!isCollapsed || selectionCount !== 1) {
    return;
  }

  const updatedLineLength = editor.getLine(selection.head.line).length;
  editor.setCursor({
    line: selection.head.line,
    ch: Math.min(selection.head.ch, updatedLineLength),
  });
}
