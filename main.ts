import { Editor, Plugin } from "obsidian";

import { resetChecklistItems } from "./src/resetChecklistItems";

export default class ChecklistReset extends Plugin {
  async onload() {
    this.addCommand({
      id: "checklist-reset",
      name: "Reset checklists",
      editorCallback: (editor: Editor) => {
        const currentValue = editor.getValue();
        const newValue = resetChecklistItems(currentValue);
        editor.setValue(newValue);
      },
    });
  }
}
