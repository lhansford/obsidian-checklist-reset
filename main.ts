import { App, MarkdownView, Plugin, PluginSettingTab, Setting } from "obsidian";

import { SetAction, setChecklistItems } from "./src/setChecklistItems";
import { ChecklistResetSettings } from "src/types";

const DEFAULT_SETTINGS: ChecklistResetSettings = { deleteTextOnReset: "" };

function handleAction(
  view: MarkdownView,
  settings: ChecklistResetSettings,
  action: SetAction
) {
  const currentValue = view.getViewData();
  const newValue = setChecklistItems(currentValue, settings, action);
  view.setViewData(newValue, false);
  view.save();
}

export default class ChecklistReset extends Plugin {
  settings: ChecklistResetSettings;

  async loadSettings() {
    this.settings = { ...DEFAULT_SETTINGS, ...(await this.loadData()) };
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }

  async onload() {
    await this.loadSettings();
    this.addSettingTab(new ChecklistResetSettingTab(this.app, this));

    this.addCommand({
      id: "checklist-reset",
      name: "Reset checklists",
      checkCallback: (checking: boolean) => {
        if (checking) {
          return !!this.app.workspace.getActiveViewOfType(MarkdownView);
        }

        const view = this.app.workspace.getActiveViewOfType(MarkdownView);
        if (view) {
          handleAction(view, this.settings, "uncheck");
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
          handleAction(view, this.settings, "check");
        }
      },
    });
  }
}

export class ChecklistResetSettingTab extends PluginSettingTab {
  plugin: ChecklistReset;

  constructor(app: App, plugin: ChecklistReset) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;

    containerEl.empty();

    new Setting(containerEl)
      .setName("Delete text on reset")
      .setDesc(
        "A regex or string. When resetting a checklist item any text matching this will be deleted."
      )
      .addText((text) =>
        text
          .setPlaceholder("/ ✅ \\d{4}-\\d{2}-\\d{2}.*/g")
          .setValue(this.plugin.settings.deleteTextOnReset)
          .onChange(async (value) => {
            this.plugin.settings.deleteTextOnReset = value;
            await this.plugin.saveSettings();
          })
      );
  }
}
