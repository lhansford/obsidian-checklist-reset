import { MarkdownView, Plugin } from "obsidian";

import { resetChecklistItems } from "./src/resetChecklistItems";

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
          const currentValue = view.getViewData()
          const newValue = resetChecklistItems(currentValue);
          view.setViewData(newValue, false);
        }
      },
    });
  }
}
