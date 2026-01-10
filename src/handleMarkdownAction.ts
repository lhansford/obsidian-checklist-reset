import { EditorSelection, MarkdownView } from "obsidian";
import { SetAction, setChecklistItems } from "./setChecklistItems";
import { ChecklistResetSettings } from "./types";

export function handleMarkdownAction(
  view: MarkdownView,
  settings: ChecklistResetSettings,
  action: SetAction,
  selectectText?: EditorSelection,
) {
  const currentValue = selectectText ?
    view.editor.getRange(selectectText.head, selectectText.anchor) :
    view.getViewData();
  const newValue = setChecklistItems(currentValue, settings, action);
  if (selectectText) {
    view.editor.replaceRange(newValue, selectectText.head, selectectText.anchor);
  } else {
    view.setViewData(newValue, false);
  }
  view.save();
}
