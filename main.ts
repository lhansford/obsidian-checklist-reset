import { Editor, Plugin } from "obsidian";

export default class ChecklistReset extends Plugin {
	async onload() {
		this.addCommand({
			id: "checklist-reset",
			name: "Reset checklists",
			editorCallback: (editor: Editor) => {
				const currentValue = editor.getValue();
				const newValue = currentValue.replaceAll("[x]", "[ ]").replaceAll("[X]", "[ ]");
				editor.setValue(newValue);
			},
		});
	}
}
