import {
  App,
  MarkdownView,
  Plugin,
  PluginSettingTab,
  Setting,
  TextFileView,
} from "obsidian";

import { SetAction } from "./src/setChecklistItems";
import { ChecklistResetSettings } from "src/types";
import { handleCanvasAction } from "src/handleCanvasAction";
import { handleMarkdownAction } from "src/handleMarkdownAction";

const DEFAULT_SETTINGS: ChecklistResetSettings = { deleteTextOnReset: "" };

function handleAction(
  app: App,
  view: TextFileView,
  settings: ChecklistResetSettings,
  action: SetAction
) {
  if (view.file.extension === "canvas") {
    handleCanvasAction(app, view, settings, action);
  } else {
    handleMarkdownAction(view as MarkdownView, settings, action);
  }
}

function isSupportedView(app: App, editorOnly = false): boolean {
  const view = app.workspace.getActiveViewOfType(TextFileView);
  const isSupportedView =
    view?.file.extension === "canvas" || view instanceof MarkdownView;
  if (isSupportedView && editorOnly && view instanceof MarkdownView) {
    return (view.currentMode as any).type === "source";
  }
  return isSupportedView;
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
          return isSupportedView(this.app);
        }

        const view = this.app.workspace.getActiveViewOfType(TextFileView);
        if (view) {
          handleAction(this.app, view, this.settings, "uncheck");
        }
      },
    });

    this.addCommand({
      id: "checklist-check-all",
      name: "Check all",
      checkCallback: (checking: boolean) => {
        if (checking) {
          return isSupportedView(this.app);
        }

        const view = this.app.workspace.getActiveViewOfType(TextFileView);
        if (view) {
          handleAction(this.app, view, this.settings, "check");
        }
      },
    });

    this.addCommand({
      id: "checklist-reset-selected",
      name: "Reset selected checklists",
      checkCallback: (checking: boolean) => {
        if (checking) {
          // Editor mode is required as we cannot select text with checkboxes properly in preview mode.
          return isSupportedView(this.app, true);
        }

        const view = this.app.workspace.getActiveViewOfType(TextFileView);

        if (view?.file.extension === "canvas") {
          const selectedNodes = (view as any).canvas.selection as Set<unknown>;
          const selectedNodeIds = [...selectedNodes].map(
            (node: { id: string }) => node.id
          );
          handleCanvasAction(
            this.app,
            view,
            this.settings,
            "uncheck",
            selectedNodeIds
          );
        } else if (view instanceof MarkdownView) {
          const selectedText = view.editor.listSelections();
          if (selectedText.length > 0) {
            handleMarkdownAction(
              view,
              this.settings,
              "uncheck",
              selectedText[0]
            );
          }
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
