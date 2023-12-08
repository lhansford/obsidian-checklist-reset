import { MarkdownView, Plugin } from "obsidian";

import { setChecklistItems } from "./src/setChecklistItems";

function handleAction(view: MarkdownView, checked = false) {
  const currentValue = view.getViewData();
  const newValue = setChecklistItems(currentValue, checked);
  view.setViewData(newValue, false);
  view.save();
}

export default class ChecklistReset extends Plugin {
  async onload() {
    this.addCommand({
      id: "checklist-reset",
      name: "Reset checklists",
      checkCallback: (checking: boolean) => {
        if (checking) {
          return !!this.app.workspace.getActiveViewOfType(MarkdownView);
        }

        const view = this.app.workspace.getActiveViewOfType(MarkdownView);
        if (view) {
          handleAction(view);
        }
      },
    });
    this.addCommand({
      id: "checklist-check-all",
      name: "Check all",
      checkCallback: (checking: boolean) => {
        if (checking) {
          return !!this.app.workspace.getActiveViewOfType(MarkdownView);
        }

        const view = this.app.workspace.getActiveViewOfType(MarkdownView);
        if (view) {
          handleAction(view, true);
        }
      },
    });
  }
}
