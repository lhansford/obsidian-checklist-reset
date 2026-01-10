import { App, TextFileView, TFile } from "obsidian";
import { SetAction, setChecklistItems } from "./setChecklistItems";
import { ChecklistResetSettings } from "./types";

export async function handleCanvasAction(
  app: App,
  view: TextFileView,
  settings: ChecklistResetSettings,
  action: SetAction,
  selectedNodes?: string[]
) {
  const currentValue = view.getViewData();
  const canvasObj = JSON.parse(currentValue);
  const nodes = (canvasObj?.nodes || []).filter((node: any) => {
    if (selectedNodes) {
      return selectedNodes.includes(node.id);
    }
    return true;
  });

  for (const node of nodes) {
    if (node.type === "text" && typeof node.text === "string") {
      node.text = setChecklistItems(node.text, settings, action);
    }
    if (node.type === "file") {
      const file = app.vault.getAbstractFileByPath(node.file);
      if (file && file instanceof TFile) {
        const fileData = await app.vault.read(file);
        const newFileData = setChecklistItems(fileData, settings, action);
        await app.vault.modify(file, newFileData);
      }
    }
  }

  const newValue = JSON.stringify(canvasObj, null, 2);
  view.setViewData(newValue, false);
  view.save();
}
